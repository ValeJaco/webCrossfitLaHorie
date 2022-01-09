import {Injectable} from '@angular/core';
import {UsersApiService} from "./users-api.service";
import {Observable} from "rxjs";
import {UsersListResponse} from "../../models/responses/users-list-response";
import {UserResponse} from "../../models/responses/user-response";

@Injectable({
  providedIn: 'root'
})
export class UsersFacadeService {

  constructor(private usersApiService: UsersApiService) {
  }

  getUsers(): Observable<UsersListResponse> {
    return this.usersApiService.getUsers();
  }

  getUsersByName(searchedName: string, resultSize?: number): Observable<UsersListResponse> {
    return this.usersApiService.getUsersByName(searchedName, resultSize);
  }

  getUserById(userId: number): Observable<UserResponse> {
    return this.usersApiService.getUserById(userId);
  }

  updateUser(userId: number, jsonUser: any): Observable<UserResponse> {
    return this.usersApiService.updateUser(userId, jsonUser);
  }

  createUser(jsonUser: any): Observable<UserResponse> {
    return this.usersApiService.createUser(jsonUser);
  }
}
