import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UsersFacadeService} from "../../services/users/users-facade.service";
import {Subscription, take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {RolesEnum} from "../../constants/rolesEnum";
import {showSnackBar} from "../../utils/utils";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit()
    :
    void {

    this.user.initializeFormController();
    this.paramUserdId = Number(this.route.snapshot.paramMap.get('id'));

    if (!
      this.paramUserdId || isNaN(this.paramUserdId)
    ) {
      this.router.navigate(['/users']);
    }

    this.usersFacade.getUserById(this.paramUserdId).pipe(take(1)).subscribe(value => {
      this.user = new User(value);
      this.unsubscribeFromUserFormControllers();
      this.user.initializeFormController();
      this.userFormSubscriptions = this.user.initializeFormControllerSubscription();
    })
  }

  postUserForm()
    :
    void {
    this.usersFacade.updateUser(this.user.id, this.user.userToApi()).pipe(take(1)).subscribe(user => {
      console.log(user)

      showSnackBar(
        this.snackBar,
        'SNACKBAR.UPDATE_GENERIC_OK',
        'success-snackbar',
        'check'
      );

    });
  }

  unsubscribeFromUserFormControllers()
    :
    void {
    this.userFormSubscriptions.forEach(sub =>
      sub.unsubscribe()
    )
    this.userFormSubscriptions = [];
  }

  unsubscribeFromAll()
    :
    void {
    this.unsubscribeFromUserFormControllers();
  }

  ngOnDestroy()
    :
    void {
    this.unsubscribeFromAll();
  }

}
