import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UsersFacadeService} from "../../services/users/users-facade.service";
import {Subscription, take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RolesEnum} from "../../constants/rolesEnum";
import {SnackBarService} from "../../services/snack-bar.service";
import {smoothAppearing} from "../../utils/animations";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  animations: [smoothAppearing]
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  paramUserdId: number;
  user: User = new User();
  userFormSubscriptions: Subscription[] = [];
  rolesArray = Object.keys(RolesEnum);

  constructor(
    private usersFacade: UsersFacadeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit(): void {

    this.user.initializeFormController();
    this.paramUserdId = Number(this.route.snapshot.paramMap.get('id'));

    if (!
      this.paramUserdId || isNaN(this.paramUserdId)
    ) {
      this.userFormSubscriptions = this.user.initializeFormControllerSubscription();
    } else {
      this.usersFacade.getUserById(this.paramUserdId).pipe(take(1)).subscribe(response => {
        this.user = new User(response.body);
        this.unsubscribeFromUserFormControllers();
        this.user.initializeFormController();
        this.userFormSubscriptions = this.user.initializeFormControllerSubscription();
      })
    }
  }

  resetUserPassword(): void {

    this.usersFacade.resetUserPassword(
      this.user.id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.RESET_USER_PASSWORD_OK");
        }, error: err => {
          this.snackBarService.showErrorSnackBar("SNACKBAR.RESET_USER_PASSWORD_NOK");
        }
      });
  }

  postUserForm(): void {
    if (this.user.valid()) {
      if (this.user.id > 0) {
        this.usersFacade.updateUser(
          this.user.id,
          this.user.userToApi())
          .pipe(take(1))
          .subscribe({
            next: (response) => {
              this.snackBarService.showSuccesSnackBar("SNACKBAR.UPDATE_USER_OK");
            }, error: err => {
              this.snackBarService.showErrorSnackBar("SNACKBAR.UPDATE_USER_NOK");
            }
          });
      } else {
        this.usersFacade.createUser(
          this.user.userToApi())
          .pipe(take(1))
          .subscribe({
            next: (response) => {
              this.snackBarService.showSuccesSnackBar("SNACKBAR.CREATE_USER_OK");
            }, error: err => {
              this.snackBarService.showErrorSnackBar("SNACKBAR.CREATE_USER_NOK");
            }
          });
      }
    } else {
      this.snackBarService.showWarningSnackBar("SNACKBAR.FORM_INCORRECT_DATA");
    }
  }

  unsubscribeFromUserFormControllers(): void {
    this.userFormSubscriptions.forEach(sub =>
      sub.unsubscribe()
    )
    this.userFormSubscriptions = [];
  }

  unsubscribeFromAll(): void {
    this.unsubscribeFromUserFormControllers();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAll();
  }

  resetUserId() {
    this.user.id = 0;
  }

}
