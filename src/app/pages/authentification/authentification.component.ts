import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {SecurityFacadeService} from "../../services/security/security-facade.service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  usernameFormControl = new FormControl('Vale@lala.fr', [Validators.required])
  passwordFormControl = new FormControl('lala', [Validators.required])

  constructor(
    private securityFacadeService: SecurityFacadeService,
    private router: Router,
    private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
  }

  logIn() {
    this.securityFacadeService.logIn(
      this.usernameFormControl.value,
      this.passwordFormControl.value
    ).pipe(take(2)).subscribe(authOk => {
      if (authOk === true) {
        this.router.navigate(['/'])
      } else if (authOk === false) {
        this.snackBarService.showErrorSnackBar("SNACKBAR.AUTHENTIFICATION_NOK");
      }
    });
  }
}
