import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {User} from "../../models/user";
import {Subscription, take} from "rxjs";
import {UsersFacadeService} from "../../services/users/users-facade.service";

@Component({
  selector: 'app-auto-complete-search-users',
  templateUrl: './auto-complete-search-users.component.html',
  styleUrls: ['./auto-complete-search-users.component.scss']
})
export class AutoCompleteSearchUsersComponent implements OnInit, OnDestroy {

  @Input()
  userSearchFieldFormControl: FormControl;

  @Output()
  selectionChangeEmitter = new EventEmitter<number>();

  userSearchFieldSubscription: Subscription;
  usersList: User[] = [];
  resultSize = 100;

  constructor(private usersFacade: UsersFacadeService) {
  }

  ngOnDestroy(): void {
    this.userSearchFieldSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsersFromApi("");
    this.userSearchFieldSubscription = this.userSearchFieldFormControl.valueChanges.subscribe(value => {
      this.loadUsersFromApi(value);
    })
  }

  loadUsersFromApi(searchedName: string) {
    this.usersFacade.getUsersByName(searchedName, this.resultSize).pipe(take(1)).subscribe(response => {
      this.usersList = response.body;
    })
  }

  changeSelectedUser(userId: number): void {
    this.selectionChangeEmitter.emit(userId)
  }
}
