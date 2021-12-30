import {Injectable} from '@angular/core';
import {UsersApiService} from "./users-api.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersFacadeService {

  constructor(private usersApiService: UsersApiService) {
  }

  getUsers(): Observable<User[]> {
    return this.usersApiService.getUsers();
  }

  getUserById(userId: number): Observable<User> {
    return this.usersApiService.getUserById(userId);
  }

  updateUser(userId: number, jsonUser: any): Observable<User | boolean> {
    return this.usersApiService.updateUser(userId, jsonUser);
  }

  createUser(jsonUser: any): Observable<User | boolean> {
    return this.usersApiService.createUser(jsonUser);
  }
}
