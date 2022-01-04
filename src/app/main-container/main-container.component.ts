import {Component, OnInit} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {SecurityFacadeService} from "../services/security/security-facade.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private securityFacadeService: SecurityFacadeService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.securityFacadeService.isLoggedWithToken();
  }

  logOut() {
    this.securityFacadeService.logOut();
    this.router.navigate(['/auth']);
  }
}
