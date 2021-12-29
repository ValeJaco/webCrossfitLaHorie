import {Injectable} from '@angular/core';
import {ApiService} from "../api.service";
import {User} from "../../models/user";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BackendResponse} from "../../models/backend-response";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private apiService: ApiService) {
  }

  getUserById(userId: number): Observable<User> {
    const url = `${environment.API_URL}/users/${userId}`;
    return this.apiService.get(url).pipe(
      map((response: BackendResponse) => {
        return response.body;
      })
    );
  }

  getUsers(): Observable<User[]> {
    const url = `${environment.API_URL}/users`;
    return this.apiService.get(url).pipe(
      map((response: BackendResponse) => {
        return response.body;
      })
    );
  }

  createUser(jsonUser: any): Observable<User> {
    return this.apiService
      .post(`${environment.API_URL}/users`, jsonUser)
      .pipe(map((response: BackendResponse) => response.body));
  }

  updateUser(userId: number, jsonUser: any): Observable<User> {
    return this.apiService
      .patch(`${environment.API_URL}/users/${userId}`, jsonUser)
      .pipe(map((response: BackendResponse) => response.body));
  }
}
