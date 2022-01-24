import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {matchPasswords, passwordComplexityCheck} from "../../models/validators/password-validators";
import {smoothAppearing} from "../../utils/animations";
import {take} from "rxjs";
import {UsersFacadeService} from "../../services/users/users-facade.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {SecurityFacadeService} from "../../services/security/security-facade.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [smoothAppearing]
})

export class ChangePasswordComponent implements OnInit {

  formGroupPassword: FormGroup;
  hideCurrent = true;
  hideNew = true;
  hideConfirm = true;

  constructor(
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacadeService,
    private snackBarService: SnackBarService,
    private securityFacadeService: SecurityFacadeService
  ) {
    this.formGroupPassword = formBuilder.group({
        'currentPassword': ['', Validators.required],
        'newPassword': ['', Validators.required],
        'confirmPassword': ['', Validators.required],
      }
    )
    this.formGroupPassword.addValidators([matchPasswords(), passwordComplexityCheck()]);
  }

  get currentPassword() {
    return this.formGroupPassword.get('currentPassword');
  }

  get newPassword() {
    return this.formGroupPassword.get('newPassword');
  }

  get confirmPassword() {
    return this.formGroupPassword.get('confirmPassword');
  }

  ngOnInit(): void {
  }

  updatePassword() {

    this.usersFacade.updateUserPassword(
      this.securityFacadeService.getJwtTokenObject().userId,
      {
        old: this.currentPassword.value,
        confirm: this.newPassword.value
      })
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.UPDATE_PASSWORD_OK");
        },
        error: err => {
          //console.log(err.error);
          this.snackBarService.showErrorSnackBar("SNACKBAR.UPDATE_PASSWORD_NOK");
        }
      });
  }
}
