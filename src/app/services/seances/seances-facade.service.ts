import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {SeancesApiService} from "./seances-api.service";
import {Seance} from "../../models/seance";

@Injectable({
  providedIn: 'root'
})
export class SeancesFacadeService {

  constructor(private seancesApiService: SeancesApiService) {
  }

  getSeances(): Observable<Seance[]> {
    return this.seancesApiService.getSeances();
  }

  getSeanceById(seanceId: number): Observable<Seance> {
    return this.seancesApiService.getSeanceById(seanceId);
  }
}
