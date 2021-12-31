import {BackendResponse} from "../backend-response";
import {User} from "../user";

export class UsersListResponse extends BackendResponse {
  body: User[];

  constructor() {
    super();
  }
}
