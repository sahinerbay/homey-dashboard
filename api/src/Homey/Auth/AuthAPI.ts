import { AuthAccount } from './AuthAccount';
import { logger } from './../../utils';
import { CONFIG } from '../../config';

export class AuthAPI extends AuthAccount {
  constructor(...args: ConstructorParameters<typeof AuthAccount>) {
    super(...args);
  }

  //  Used to authenticate a user and get a token
  async fetchAccessToken(): Promise<void> {
    const URL = `${CONFIG.HOMEY_AUTH_API}/oauth2/token`;
    logger.info('POST token (resolve code to token) ' + URL);

    const resp = await fetch(URL, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body:
        'client_id=' +
        encodeURIComponent(this.clientId) +
        '&client_secret=' +
        encodeURIComponent(this.clientSecret) +
        '&grant_type=authorization_code&code=' +
        encodeURIComponent(this._code),
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    if (!resp.ok) {
      logger.info(
        `Something went wrong while 'POST token (resolve code to token)' ${URL}: ${resp.status}, ${resp.statusText}`
      );
      throw resp;
    }

    const body = await resp.text();
    const token = JSON.parse(body);
    logger.info('Response', token);
    this._accessToken = token.access_token;
    this._refreshToken = token.refresh_token;
  }

  async fetchJwtToken(): Promise<void> {
    const URL = `${CONFIG.HOMEY_AUTH_API}/delegation/token?audience=homey`;
    logger.info(
      'POST JWT token (resolve access and refresh tokens to JWT) ' +
        URL
    );

    const resp = await fetch(URL, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: 'Bearer ' + this._accessToken,
      },
      referrerPolicy: 'no-referrer-when-downgrade',
      body:
        'client_id=' +
        this.clientId +
        '&client_secret=' +
        this.clientSecret +
        '&grant_type=refresh_token&refresh_token=' +
        this._refreshToken,
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    const jwtToken = await resp.json();
    logger.info(' JWT token is ' + jwtToken);
    this._jwtToken = jwtToken;
  }

  async fetchApiToken(): Promise<string> {
    const URL = `https://${this.cloudid}.connect.athom.com/api/manager/users/login`;
    logger.info('POST Login endpoint ' + URL);

    const resp = await fetch(URL, {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ token: this._jwtToken }),
      method: 'POST',
    });

    const apiToken = await resp.json();
    logger.info(' API token is ' + apiToken);
    return apiToken;
  }
}
