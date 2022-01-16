import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, take} from "rxjs";
import {initGenericArrayFromJson} from "../../utils/utils";
import {User} from "../../models/user";
import {UsersFacadeService} from "../../services/users/users-facade.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  userList: User[];
  userSearchFieldFormControl: FormControl;
  userSearchFieldSubscription: Subscription;

  constructor(private usersFacade: UsersFacadeService, private router: Router) {
  }

  ngOnDestroy(): void {
    this.userSearchFieldSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initialiseFormController();
    this.initialiseFormSubscriptions();
    this.loadUsers("");
  }

  goToUserDetails(userId: number) {
    this.router.navigate(['/users/' + userId]);
  }

  goToNewUser(): void {
    this.router.navigate(['/users/new']);
  }

  initialiseFormController(): void {
    this.userSearchFieldFormControl = new FormControl("")
  }

  initialiseFormSubscriptions(): void {
    this.userSearchFieldSubscription = this.userSearchFieldFormControl.valueChanges.subscribe(value => {
      this.loadUsers(value);
    })
  }

  loadUsers(searchedName: string): void {
    this.usersFacade.getUsersByName(searchedName).pipe(take(1)).subscribe(response => {
      this.userList = initGenericArrayFromJson(User, response.body);
    })
  }

  resetFilters(): void {
    this.userSearchFieldFormControl.setValue("");
  }
}
