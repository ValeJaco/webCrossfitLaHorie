import {Planning} from "../planning";
import {BackendResponse} from "../backend-response";

export class PlanningListResponse extends BackendResponse {

  body: Planning[];

  constructor() {
    super();
  }
}
