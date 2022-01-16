import {BackendResponse} from "../backend-response";
import {SeancePlanning} from "../seance-planning";

export class SeancePlanningResponse extends BackendResponse {

  body: SeancePlanning;

  constructor() {
    super();
  }

}
