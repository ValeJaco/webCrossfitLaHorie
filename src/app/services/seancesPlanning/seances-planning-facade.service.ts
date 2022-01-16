import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {SeancesPlanningApiService} from "./seances-planning-api.service";
import {PlanningResponse} from "../../models/responses/planning-response";
import {PlanningListResponse} from "../../models/responses/planning-list-response";
import {StringResponse} from "../../models/responses/string-response";
import {SeancePlanningResponse} from "../../models/responses/seance-planning-response";

@Injectable({
  providedIn: 'root'
})
export class SeancesPlanningFacadeService {

  constructor(private seancesPlanningApiService: SeancesPlanningApiService) {
  }

  getPlanningById(planningId: number): Observable<PlanningResponse> {
    return this.seancesPlanningApiService.getPlanningById(planningId);
  }

  getPlannings(): Observable<PlanningListResponse> {
    return this.seancesPlanningApiService.getPlannings();
  }

  createPlanning(jsonPlanning: any): Observable<PlanningResponse> {
    return this.seancesPlanningApiService.createPlanning(jsonPlanning);
  }

  addSeancesToPlanning(jsonPlanning: any): Observable<SeancePlanningResponse> {
    return this.seancesPlanningApiService.createSeancePlanning(jsonPlanning);
  }

  patchPlanning(planningId: number, jsonPlanning: any): Observable<PlanningResponse> {
    return this.seancesPlanningApiService.patchPlanning(planningId, jsonPlanning);
  }

  patchSeancePlanning(seancePlanningId: number, jsonSeancePlanning: any): Observable<PlanningResponse> {
    return this.seancesPlanningApiService.patchSeancePlanning(seancePlanningId, jsonSeancePlanning);
  }

  deleteSeancePlanning(seancePlanningId: number): Observable<StringResponse> {
    return this.seancesPlanningApiService.deleteSeancePlanning(seancePlanningId);
  }

}
