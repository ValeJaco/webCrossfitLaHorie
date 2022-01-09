import {Injectable} from '@angular/core';
import {SecurityApiService} from "./security-api.service";
import {SecurityStorageService} from "./security-storage.service";
import {ResponseEnum} from "../../constants/response-enum";
import {BehaviorSubject, Observable} from "rxjs";
import jwtDecode from 'jwt-decode';
import {JwtToken} from "../../models/jwt-token";

@Injectable({
  providedIn: 'root'
})
export class SecurityFacadeService {

  authResponse = new BehaviorSubject<boolean>(null);

  constructor(
    private securityApiService: SecurityApiService,
    private securityStorageService: SecurityStorageService,
  ) {
  }

  logOut(): void {
    this.securityStorageService.logOut();
  }

  isLoggedWithToken(): boolean {
    return this.securityStorageService.getJwtToken()?.length > 0;
  }

  getAuthToken(): string {
    return this.securityStorageService.getJwtToken();
  }

  getJwtTokenObject(): JwtToken {
    return jwtDecode<JwtToken>(this.getAuthToken());
  }

  hasRole(roleName: string): boolean {
    return this.getJwtTokenObject().roles.findIndex(role => role === roleName) > -1;
  }

  logIn(username: string, password: string): Observable<boolean> {
    this.securityApiService.logIn(username, password).subscribe(response => {
      if (response.status === ResponseEnum.OK) {
        this.securityStorageService.setJwtToken(response.body.jwt);
        this.authResponse.next(true);
      } else {
        this.authResponse.next(false);
      }
    });
    return this.authResponse.asObservable();
  }
}
