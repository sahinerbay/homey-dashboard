import { AuthAPI } from './AuthAPI';

export class Auth extends AuthAPI {
  constructor(
    clientId: string,
    clientSecret: string,
    email: string,
    password: string,
    cloudid: string
  ) {
    super(clientId, clientSecret, email, password, cloudid);
  }

  async authenticate(): Promise<string> {
    await this.fetchAuthenticationToken();
    await this.fetchAuthorizationCookie();
    await this.fetchAuthorizationCode();

    await this.fetchAccessToken();
    await this.fetchJwtToken();
    return this.fetchApiToken();
  }
}
