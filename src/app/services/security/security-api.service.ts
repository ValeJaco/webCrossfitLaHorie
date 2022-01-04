import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {AuthResponse} from "../../models/responses/auth-response";
import {environment} from "../../../environments/environment";
import {ApiService} from "../api.service";

@Injectable({
  providedIn: 'root'
})
export class SecurityApiService {

  constructor(private apiService: ApiService) {
  }

  logIn(username: string, password: string): Observable<AuthResponse> {
    return this.apiService
      .post(`${environment.API_URL}/authenticate`, {username: username, password: password})
      .pipe(map((response: AuthResponse) => {
        return response;
      }));
  }

}
