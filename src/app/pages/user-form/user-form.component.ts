import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  user: User;

  constructor() {
  }

  ngOnInit(): void {
    this.user = new User();

    this.user.lastname = "Jacobi";
    this.user.forename = "Valérian";
    this.user.username = "user@lala.fr";

    this.user.initializeFormController();

    this.user.lastnameFormControl.valueChanges.subscribe(value => {
      this.user.lastname = value;
    })

    this.user.forenameFormControl.valueChanges.subscribe(value => {
      this.user.forename = value;
    })

    this.user.usernameFormControl.valueChanges.subscribe(value => {
      this.user.username = value;
    })
  }

  showValue() {
    console.log(this.user);
  }

}
