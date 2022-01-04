import {Injectable} from '@angular/core';
import {LOCAL_STORAGE_JWT_KEY} from "../../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class SecurityStorageService {

  private jwtAuthToken: string;

  constructor() {
    this.getTokenFromStorage();
  }

  setJwtToken(newToken: string): void {
    localStorage.setItem(LOCAL_STORAGE_JWT_KEY, newToken);
    this.getTokenFromStorage();
  }

  getJwtToken(): string {
    return this.jwtAuthToken;
  }

  logOut(): void {
    localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
    this.getTokenFromStorage();
  }

  private getTokenFromStorage(): void {
    this.jwtAuthToken = localStorage.getItem(LOCAL_STORAGE_JWT_KEY) || null;
  }
}
