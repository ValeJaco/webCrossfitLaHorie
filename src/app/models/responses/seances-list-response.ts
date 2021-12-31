import {BackendResponse} from "../backend-response";
import {Seance} from "../seance";

export class SeancesListResponse extends BackendResponse {
  body: Seance[];

  constructor() {
    super();
  }
}
