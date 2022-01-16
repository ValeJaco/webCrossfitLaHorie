import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiService} from "../api.service";
import {PlanningResponse} from "../../models/responses/planning-response";
import {PlanningListResponse} from "../../models/responses/planning-list-response";
import {StringResponse} from "../../models/responses/string-response";
import {SeancePlanningResponse} from "../../models/responses/seance-planning-response";

@Injectable({
  providedIn: 'root'
})
export class SeancesPlanningApiService {

  constructor(private apiService: ApiService) {
  }

  getPlanningById(planningId: number): Observable<PlanningResponse> {
    return this.apiService
      .get(`${environment.API_URL}/plannings/${planningId}`)
      .pipe(map((response: PlanningResponse) => {
        return response;
      }));
  }

  getPlannings(): Observable<PlanningListResponse> {
    return this.apiService
      .get(`${environment.API_URL}/plannings`)
      .pipe(map((response: PlanningListResponse) => {
        return response;
      }));
  }

  createPlanning(jsonPlanning: any): Observable<PlanningResponse> {
    return this.apiService
      .post(`${environment.API_URL}/plannings`, jsonPlanning)
      .pipe(map((response: PlanningResponse) => {
        return response;
      }));
  }

  patchPlanning(planningId: number, jsonPlanning: any): Observable<PlanningResponse> {
    return this.apiService
      .patch(`${environment.API_URL}/plannings/${planningId}`, jsonPlanning)
      .pipe(map((response: PlanningResponse) => {
        return response;
      }));
  }

  patchSeancePlanning(seancePlanningId: number, jsonSeancePlanning: any): Observable<PlanningResponse> {
    return this.apiService
      .patch(`${environment.API_URL}/plannings/seances/${seancePlanningId}`, jsonSeancePlanning)
      .pipe(map((response: PlanningResponse) => {
        return response;
      }));
  }

  createSeancePlanning(jsonSeancePlanning: any): Observable<SeancePlanningResponse> {
    return this.apiService
      .post(`${environment.API_URL}/plannings/seances/`, jsonSeancePlanning)
      .pipe(map((response: SeancePlanningResponse) => {
        return response;
      }));
  }

  deleteSeancePlanning(seancePlanningId: number): Observable<StringResponse> {
    return this.apiService
      .delete(`${environment.API_URL}/plannings/seances/${seancePlanningId}`)
      .pipe(map((response: StringResponse) => {
        return response;
      }));
  }

}
