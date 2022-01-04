import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SecurityFacadeService} from "../services/security/security-facade.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private securityFacadeService: SecurityFacadeService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.securityFacadeService.isLoggedWithToken()) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + this.securityFacadeService.getAuthToken())
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
