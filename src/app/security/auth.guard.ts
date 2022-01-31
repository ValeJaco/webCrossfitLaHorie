import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityFacadeService} from "../services/security/security-facade.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    protected readonly router: Router,
    protected readonly securityFacadeService: SecurityFacadeService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.securityFacadeService.isLoggedWithToken()) {
      return true;
    } else {
      this.router.navigate(['/auth']).then();
      return false;
    }
  }
}
