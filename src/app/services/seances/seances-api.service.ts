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

  getSeances(filters = ""): Observable<SeancesListResponse> {
    const url = `${environment.API_URL}/seances${filters}`;
    return this.apiService.get(url).pipe(
      map((response: SeancesListResponse) => {
        return response;
      })
    );
  }

  getIncomingSeancesByUserId(userId: number): Observable<SeancesListResponse> {
    const url = `${environment.API_URL}/incomingSeances/${userId}`;
    return this.apiService.get(url).pipe(
      map((response: SeancesListResponse) => {
        return response;
      })
    );
  }

  getAllSeancesByUserId(userId: number): Observable<SeancesListResponse> {
    const url = `${environment.API_URL}/allSeances/${userId}`;
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
        return response;
      }));
  }

  updateSeance(seanceId: number, jsonSeance: any): Observable<SeanceResponse> {
    return this.apiService
      .patch(`${environment.API_URL}/seances/${seanceId}`, jsonSeance)
      .pipe(map((response: SeanceResponse) => {
        return response;
      }));
  }

  addGuestToSeance(jsonGuest: any): Observable<SeanceResponse> {
    return this.apiService
      .post(`${environment.API_URL}/seances/guests`, jsonGuest)
      .pipe(map((response: SeanceResponse) => {
        return response;
      }));
  }

  removeGuestFromSeance(guestId: number): Observable<SeanceResponse> {
    return this.apiService
      .delete(`${environment.API_URL}/seances/guests/${guestId}`)
      .pipe(map((response: SeanceResponse) => {
        return response;
      }));
  }

}
