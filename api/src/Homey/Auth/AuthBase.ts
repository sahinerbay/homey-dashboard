export class AuthBase {
  clientId: string;
  clientSecret: string;
  email: string;
  password: string;
  cloudid: string;

  _accessToken: string = '';
  _refreshToken: string = '';
  _jwtToken: string = '';

  _code: string = '';
  _token: string = '';
  _csrf: string = '';
  _cookie: string = '';

  constructor(
    clientId: string,
    clientSecret: string,
    email: string,
    password: string,
    cloudid: string
  ) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.email = email;
    this.password = password;
    this.cloudid = cloudid;
  }
}
