import { AuthBase } from './AuthBase';
import { logger } from './../../utils';
import { CONFIG } from '../../config';

export class AuthAccount extends AuthBase {
  tokenValidDurationInSecs: number = 0;

  constructor(...args: ConstructorParameters<typeof AuthBase>) {
    super(...args);
  }

  async fetchAuthenticationToken(): Promise<void> {
    const URL = `${CONFIG.HOMEY_AUTH_ACCOUNT}/login`;
    logger.info('POST Authentication ' + URL);

    const resp = await fetch(URL, {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'content-type':
          'application/x-www-form-urlencoded; charset=UTF-8',
      },
      referrerPolicy: 'no-referrer-when-downgrade',
      body:
        'email=' +
        encodeURIComponent(this.email) +
        '&password=' +
        encodeURIComponent(this.password) +
        '&otptoken=',
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    });

    const body = await resp.text();
    const token = JSON.parse(body).token;
    logger.info('Response', token);
    this._token = token;
  }

  async fetchAuthorizationCookie(): Promise<void> {
    const URL =
      `${CONFIG.HOMEY_AUTH_ACCOUNT}/authorise` +
      `?client_id=${this.clientId}` +
      `&redirect_uri=${encodeURIComponent(
        CONFIG.HOMEY_AUTH_REDIRECT_URL
      )}` +
      `&response_type=code` +
      `&user_token=${this._token}`;

    logger.info('GET Authorization', URL);

    const resp = await fetch(URL, {
      headers: {},
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    const body = await resp.text();

    let cookiecsrf = null;
    const raw = resp.headers.getSetCookie();

    for (const cookie of raw) {
      if (cookie.startsWith('_csrf=')) {
        const matchResult = cookie.match(/=(.+?);/);
        cookiecsrf = matchResult ? matchResult[1] : null;
        break;
      }
    }

    const csrf =
      body
        .split('name="_csrf" value="')
        .pop()
        ?.split('">')[0]
        ?.trim() || '';
    const cookie = '_csrf=' + cookiecsrf;
    logger.info('Response', { csrf, cookie });
    this._csrf = csrf;
    this._cookie = cookie;
  }

  async fetchAuthorizationCode(): Promise<void> {
    const URL =
      `${CONFIG.HOMEY_AUTH_ACCOUNT}/authorise` +
      `?client_id=${this.clientId}` +
      `&redirect_uri=${encodeURIComponent(
        CONFIG.HOMEY_AUTH_REDIRECT_URL
      )}` +
      `&response_type=code` +
      `&user_token=${this._token}`;

    logger.info('GET Authorization', URL);

    const resp = await fetch(URL, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        cookie: this._cookie,
      },
      redirect: 'manual',
      body:
        'resource=resource.homey.' +
        this.cloudid +
        '&_csrf=' +
        this._csrf +
        '&allow=Allow',
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    const code = resp.headers.get('location')!.split('=')[1];

    logger.info(
      ' Response from authorization. Redirect to ',
      resp.headers.get('location')
    );
    logger.info(' Parsed the following code ', code);

    this._code = code;
  }
}
