import {Planning} from "../planning";
import {BackendResponse} from "../backend-response";

export class PlanningResponse extends BackendResponse {

  body: Planning;

  constructor() {
    super();
  }

}
