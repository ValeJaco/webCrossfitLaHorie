import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {SecurityFacadeService} from "../../services/security/security-facade.service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {SnackBarService} from "../../services/snack-bar.service";
import {smoothAppearing} from "../../utils/animations";
import {SecurityStorageService} from "../../services/security/security-storage.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [smoothAppearing]
})
export class AuthenticationComponent implements OnInit {

  // usernameFormControl = new FormControl('Vale@lala.fr', [Validators.required])
  // passwordFormControl = new FormControl('lala', [Validators.required])
  usernameFormControl = new FormControl('', [Validators.required])
  passwordFormControl = new FormControl('', [Validators.required])

  constructor(
    private securityFacadeService: SecurityFacadeService,
    private router: Router,
    private snackBarService: SnackBarService,
    private securityStorageService: SecurityStorageService) {
  }

  ngOnInit(): void {
  }

  logIn() {
    this.securityFacadeService.logIn(
      this.usernameFormControl.value,
      this.passwordFormControl.value
    ).pipe(take(1)).subscribe({
      next: (authOk) => {
        this.securityStorageService.setJwtToken(authOk.body.jwt);
        this.router.navigate(['/']).then();
      }, error: () => {
        this.snackBarService.showErrorSnackBar("SNACKBAR.AUTHENTICATION_NOK");
      }
    });
  }
}
