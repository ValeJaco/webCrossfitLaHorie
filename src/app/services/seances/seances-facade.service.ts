import {Injectable} from '@angular/core';
import {Observable, take} from "rxjs";
import {SeancesApiService} from "./seances-api.service";
import {SeancesListResponse} from "../../models/responses/seances-list-response";
import {SeanceResponse} from "../../models/responses/seance-response";
import {SeancesStorageService} from "./seances-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SeancesFacadeService {

  constructor(
    private seancesApiService: SeancesApiService,
    private seancesStorageService: SeancesStorageService) {
  }

  loadSeances(filters = ""): void {
    this.seancesApiService.getSeances(filters).pipe(take(1))
      .subscribe(response => {
        this.seancesStorageService.setSeances(response);
      })
  }

  getSeances(): Observable<SeancesListResponse> {
    return this.seancesStorageService.getSeances();
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

  addUserToSeance(seanceId: number, userToAddId: number): Observable<SeanceResponse> {
    return this.seancesApiService.updateSeance(seanceId, {userToAddId: userToAddId});
  }

  removeUserFromSeance(seanceId: number, userToRemoveId: number): Observable<SeanceResponse> {
    return this.seancesApiService.updateSeance(seanceId, {userToRemoveId: userToRemoveId});
  }

}
