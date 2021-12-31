import {Component, OnInit} from '@angular/core';
import {take} from "rxjs";
import {initGenericArrayFromJson} from "../../utils/utils";
import {User} from "../../models/user";
import {UsersFacadeService} from "../../services/users/users-facade.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  userList: User[];

  constructor(private usersFacade: UsersFacadeService, private router: Router) {
  }

  ngOnInit(): void {

    this.usersFacade.getUsers().pipe(take(1)).subscribe(response => {
      this.userList = initGenericArrayFromJson(User, response.body);
    })
  }

  goToUserDetail(userId: number) {
    this.router.navigate(['/users/' + userId]);
  }

}
