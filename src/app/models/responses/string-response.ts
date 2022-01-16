import {BackendResponse} from "../backend-response";

export class StringResponse extends BackendResponse {

  body: string;

  constructor() {
    super();
  }
}
