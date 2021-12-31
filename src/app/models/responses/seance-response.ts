import {BackendResponse} from "../backend-response";
import {Seance} from "../seance";

export class SeanceResponse extends BackendResponse {
  body: Seance;

  constructor() {
    super();
  }
}
