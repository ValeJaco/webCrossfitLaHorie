export class JwtToken {

  iat: number;
  roles: string[];
  sub: string
  userId: number;

  constructor(token: any) {
    this.copy(token);
  }

  copy(token?: JwtToken) {
    if (token) {
      this.iat = token.iat;
      this.roles = token.roles;
      this.sub = token.sub;
      this.userId = token.userId;
    }
  }
}
