import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UsersFacadeService} from "../../services/users/users-facade.service";
import {Subscription, take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RolesEnum} from "../../constants/rolesEnum";
import {ResponseEnum} from "../../constants/response-enum";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

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

  postUserForm(): void {

    if (this.user.id > 0) {
      this.usersFacade.updateUser(
        this.user.id,
        this.user.userToApi())
        .pipe(take(1))
        .subscribe(response => {
          if (response.status === ResponseEnum.OK) {
            this.snackBarService.showSuccesSnackBar("SNACKBAR.UPDATE_USER_OK");
          } else {
            this.snackBarService.showErrorSnackBar("SNACKBAR.UPDATE_USER_NOK");
          }
        });
    } else {
      this.usersFacade.createUser(
        this.user.userToApi())
        .pipe(take(1))
        .subscribe(response => {
          if (response.status === ResponseEnum.OK) {
            this.user.id = response.body.id
            this.snackBarService.showSuccesSnackBar("SNACKBAR.CREATE_USER_OK");
          } else {
            this.snackBarService.showErrorSnackBar("SNACKBAR.CREATE_USER_NOK");
          }
        });
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
