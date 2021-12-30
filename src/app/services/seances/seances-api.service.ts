import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BackendResponse} from "../../models/backend-response";
import {ApiService} from "../api.service";
import {Seance} from "../../models/seance";

@Injectable({
  providedIn: 'root'
})
export class SeancesApiService {

  constructor(private apiService: ApiService) {
  }

  getSeanceById(seanceId: number): Observable<Seance> {
    const url = `${environment.API_URL}/seances/${seanceId}`;
    return this.apiService.get(url).pipe(
      map((response: BackendResponse) => {
        return response.body;
      })
    );
  }

  getSeances(): Observable<Seance[]> {
    const url = `${environment.API_URL}/seances`;
    return this.apiService.get(url).pipe(
      map((response: BackendResponse) => {
        return response.body;
      })
    );
  }

}
