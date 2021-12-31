import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {SeancesApiService} from "./seances-api.service";
import {SeancesListResponse} from "../../models/responses/seances-list-response";
import {SeanceResponse} from "../../models/responses/seance-response";

@Injectable({
  providedIn: 'root'
})
export class SeancesFacadeService {

  constructor(private seancesApiService: SeancesApiService) {
  }

  getSeances(): Observable<SeancesListResponse> {
    return this.seancesApiService.getSeances();
  }

  getSeanceById(seanceId: number): Observable<SeanceResponse> {
    return this.seancesApiService.getSeanceById(seanceId);
  }

  updateSeance(seanceId: number, jsonSeance: any): Observable<SeanceResponse> {
    return this.seancesApiService.updateSeance(seanceId, jsonSeance);
  }

  createSeance(jsonSeance: any): Observable<SeanceResponse> {
    return this.seancesApiService.createSeance(jsonSeance);
  }
}
