import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {capitalise} from "../utils/utils";

export class User {

  id: number;
  username: string;
  forename: string;
  lastname: string;
  lastConnectionDate: Date;
  useSessionNotebook: boolean;
  availableSessionNumber: number;
  address: string;
  zipCode: string;
  city: string;
  subscriptionDate: string;
  birthDate: Date;
  renewalDate: Date;
  paymentMethod: string;
  freeAccess: boolean;
  badgeReference: string;
  roles: string[];

  usernameFormControl: FormControl;
  forenameFormControl: FormControl;
  lastnameFormControl: FormControl;
  useSessionNotebookFormControl: FormControl;
  availableSessionNumberFormControl: FormControl;
  addressFormControl: FormControl;
  zipCodeFormControl: FormControl;
  cityFormControl: FormControl;
  subscriptionDateFormControl: FormControl;
  birthDateFormControl: FormControl;
  renewalDateFormControl: FormControl;
  paymentMethodFormControl: FormControl;
  freeAccessFormControl: FormControl;
  badgeReferenceFormControl: FormControl;
  rolesFormControl: FormControl;

  constructor(user?: User) {
    this.copy(user);
  }

  copy(user: User) {
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.forename = user.forename;
      this.lastname = user.lastname;
      this.lastConnectionDate = user.lastConnectionDate;
      this.useSessionNotebook = user.useSessionNotebook;
      this.availableSessionNumber = user.availableSessionNumber;
      this.address = user.address;
      this.zipCode = user.zipCode;
      this.city = user.city;
      this.subscriptionDate = user.subscriptionDate;
      this.birthDate = user.birthDate;
      this.renewalDate = user.renewalDate;
      this.paymentMethod = user.paymentMethod;
      this.freeAccess = user.freeAccess;
      this.badgeReference = user.badgeReference;
      this.roles = user.roles;
    }
  }

  valid(): boolean {
    return this.usernameFormControl.valid &&
      this.forenameFormControl.valid &&
      this.lastnameFormControl.valid &&
      this.subscriptionDateFormControl.valid;
  }

  initializeFormController(): void {

    this.usernameFormControl = new FormControl(this.username, [Validators.required]);
    this.forenameFormControl = new FormControl(this.forename, [Validators.required]);
    this.lastnameFormControl = new FormControl(this.lastname, [Validators.required]);
    this.useSessionNotebookFormControl = new FormControl(this.useSessionNotebook, [Validators.required]);
    this.availableSessionNumberFormControl = new FormControl(this.availableSessionNumber);
    this.addressFormControl = new FormControl(this.address);
    this.zipCodeFormControl = new FormControl(this.zipCode);
    this.cityFormControl = new FormControl(this.city);
    this.subscriptionDateFormControl = new FormControl(this.subscriptionDate, [Validators.required]);
    this.birthDateFormControl = new FormControl(this.birthDate);
    this.renewalDateFormControl = new FormControl(this.renewalDate);
    this.paymentMethodFormControl = new FormControl(this.paymentMethod);
    this.freeAccessFormControl = new FormControl(this.freeAccess);
    this.badgeReferenceFormControl = new FormControl(this.badgeReference);
    this.rolesFormControl = new FormControl(this.roles);
  }

  initializeFormControllerSubscription(): Subscription[] {

    const subArray: Subscription[] = [];

    subArray.push(this.lastnameFormControl.valueChanges.subscribe(value => {
      this.lastname = value;
    }))
    subArray.push(this.forenameFormControl.valueChanges.subscribe(value => {
      this.forename = value;
    }))
    subArray.push(this.usernameFormControl.valueChanges.subscribe(value => {
      this.username = value;
    }))
    subArray.push(this.useSessionNotebookFormControl.valueChanges.subscribe(value => {
      this.useSessionNotebook = value;
    }))
    subArray.push(this.availableSessionNumberFormControl.valueChanges.subscribe(value => {
      this.availableSessionNumber = value;
    }))
    subArray.push(this.addressFormControl.valueChanges.subscribe(value => {
      this.address = value;
    }))
    subArray.push(this.zipCodeFormControl.valueChanges.subscribe(value => {
      this.zipCode = value;
    }))
    subArray.push(this.cityFormControl.valueChanges.subscribe(value => {
      this.city = value;
    }))
    subArray.push(this.subscriptionDateFormControl.valueChanges.subscribe(value => {
      this.subscriptionDate = value;
    }))
    subArray.push(this.birthDateFormControl.valueChanges.subscribe(value => {
      this.birthDate = value;
    }))
    subArray.push(this.renewalDateFormControl.valueChanges.subscribe(value => {
      this.renewalDate = value;
    }))
    subArray.push(this.paymentMethodFormControl.valueChanges.subscribe(value => {
      this.paymentMethod = value;
    }))
    subArray.push(this.freeAccessFormControl.valueChanges.subscribe(value => {
      this.freeAccess = value;
    }))
    subArray.push(this.badgeReferenceFormControl.valueChanges.subscribe(value => {
      this.badgeReference = value;
    }))
    subArray.push(this.rolesFormControl.valueChanges.subscribe(value => {
      this.roles = value;
    }))
    return subArray;
  }

  userToApi(): string {

    this.forename = capitalise(this.forename);
    this.lastname = capitalise(this.lastname);

    return JSON.stringify(
      this,
      [
        'username',
        'forename',
        'lastname',
        'lastConnectionDate',
        'useSessionNotebook',
        'availableSessionNumber',
        'address',
        'zipCode',
        'city',
        'subscriptionDate',
        'birthDate',
        'renewalDate',
        'paymentMethod',
        'freeAccess',
        'badgeReference',
        'roles'
      ]);
  }

  isValid(user: User): boolean {

    let formsValid = true;

    Object.keys(user).forEach(attributeName => {
      if (attributeName.endsWith('FormControl')) {
        if (this["freeAccessFormControl"].invalid) {
          formsValid = false;
        }
      }
    })

    return formsValid;
  }
}
