import {FormControl} from "@angular/forms";

export class User {

  username: string;
  forename: string;
  lastname: string;

  usernameFormControl: FormControl;
  forenameFormControl: FormControl;
  lastnameFormControl: FormControl;

  constructor() {
  }

  initializeFormController() {
    this.usernameFormControl = new FormControl();
    this.forenameFormControl = new FormControl();
    this.lastnameFormControl = new FormControl();
  }
}
