import {BackendResponse} from "../backend-response";
import {User} from "../user";

export class UserResponse extends BackendResponse {
  body: User;

  constructor() {
    super();
  }
}
