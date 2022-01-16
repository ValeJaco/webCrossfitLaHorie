import {BackendResponse} from "../backend-response";
import {SeancePlanning} from "../seance-planning";

export class SeancesPlanningListResponse extends BackendResponse {

  body: SeancePlanning[];

  constructor() {
    super();
  }

}
