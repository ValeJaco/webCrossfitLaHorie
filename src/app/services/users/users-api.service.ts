import {Injectable} from '@angular/core';
import {ApiService} from "../api.service";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserResponse} from "../../models/responses/user-response";
import {UsersListResponse} from "../../models/responses/users-list-response";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private apiService: ApiService) {
  }

  getUserById(userId: number): Observable<UserResponse> {
    const url = `${environment.API_URL}/users/${userId}`;
    return this.apiService.get(url).pipe(
      map((response: UserResponse) => {
        return response;
      })
    );
  }

  getUsers(): Observable<UsersListResponse> {
    const url = `${environment.API_URL}/users`;
    return this.apiService.get(url).pipe(
      map((response: UsersListResponse) => {
        return response;
      })
    );
  }

  getUsersByName(searchedName: string, resultSize: number = 20): Observable<UsersListResponse> {
    const url = `${environment.API_URL}/usersByName?searchedName=${searchedName}&resultSize=${resultSize}`;
    return this.apiService.get(url).pipe(
      map((response: UsersListResponse) => {
        return response;
      })
    );
  }

  createUser(jsonUser: any): Observable<UserResponse> {
    return this.apiService
      .post(`${environment.API_URL}/users`, jsonUser)
      .pipe(map((response: UserResponse) => {
        return response;
      }));
  }

  updateUser(userId: number, jsonUser: any): Observable<UserResponse> {
    return this.apiService
      .patch(`${environment.API_URL}/users/${userId}`, jsonUser)
      .pipe(map((response: UserResponse) => {
        return response;
      }));
  }

  updateUserPassword(userId: number, jsonUser: any): Observable<UserResponse> {
    return this.apiService
      .patch(`${environment.API_URL}/users/pwd/${userId}`, jsonUser)
      .pipe(map((response: UserResponse) => {
        return response;
      }));
  }

  resetUserPassword(userId: number): Observable<UserResponse> {
    return this.apiService
      .patch(`${environment.API_URL}/users/resetPwd/${userId}`, null)
      .pipe(map((response: UserResponse) => {
        return response;
      }));
  }
}
