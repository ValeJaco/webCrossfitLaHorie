import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiService} from "../api.service";
import {SeanceResponse} from "../../models/responses/seance-response";
import {SeancesListResponse} from "../../models/responses/seances-list-response";

@Injectable({
  providedIn: 'root'
})
export class SeancesApiService {

  constructor(private apiService: ApiService) {
  }

  getSeanceById(seanceId: number): Observable<SeanceResponse> {
    const url = `${environment.API_URL}/seances/${seanceId}`;
    return this.apiService.get(url).pipe(
      map((response: SeanceResponse) => {
        return response;
      })
    );
  }

  getSeances(): Observable<SeancesListResponse> {
    const url = `${environment.API_URL}/seances`;
    return this.apiService.get(url).pipe(
      map((response: SeancesListResponse) => {
        return response;
      })
    );
  }

  createSeance(jsonSeance: any): Observable<SeanceResponse> {
    return this.apiService
      .post(`${environment.API_URL}/seances`, jsonSeance)
      .pipe(map((response: SeanceResponse) => {
        if (response.status == this.apiService.STATUS_OK) {
          return response;
        }
      }));
  }

  updateSeance(seanceId: number, jsonSeance: any): Observable<SeanceResponse> {
    return this.apiService
      .patch(`${environment.API_URL}/seances/${seanceId}`, jsonSeance)
      .pipe(map((response: SeanceResponse) => {
        if (response.status == this.apiService.STATUS_OK) {
          return response;
        }
      }));
  }

}
