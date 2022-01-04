import {BackendResponse} from "../backend-response";

export class AuthResponse extends BackendResponse {
  body: BodyJwtToken;

  constructor() {
    super();
  }
}

export class BodyJwtToken extends BackendResponse {
  jwt: string;

  constructor() {
    super();
  }
}
