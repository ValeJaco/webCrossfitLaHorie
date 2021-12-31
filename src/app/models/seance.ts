import {User} from "./user";
import {initGenericArrayFromJson} from "../utils/utils";
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {DatePipe} from "@angular/common";

export class Seance {

  id: number;
  name: string;
  maxSpot: number;
  startDate: Date;
  duration: number;
  location: string;
  coachId: number;
  users: User[];

  nameFormControl: FormControl;
  maxSpotFormControl: FormControl;
  startDateFormControl: FormControl;
  durationFormControl: FormControl;
  locationFormControl: FormControl;
  coachIdFormControl: FormControl;

  constructor(seance?: any) {
    this.copy(seance);
  }

  copy(seance: Seance) {
    if (seance) {
      this.id = seance.id;
      this.name = seance.name;
      this.maxSpot = seance.maxSpot;
      this.startDate = seance.startDate;
      this.duration = seance.duration;
      this.location = seance.location;
      this.coachId = seance.coachId;
      this.users = initGenericArrayFromJson(User, seance.users);
    }
  }

  initializeFormController(datePipe: DatePipe): void {

    this.nameFormControl = new FormControl(this.name, [Validators.required]);
    this.maxSpotFormControl = new FormControl(this.maxSpot, [Validators.required]);
    this.startDateFormControl = new FormControl(
      datePipe.transform(this.startDate, "YYYY-MM-ddTHH:mm:ss"),
      [Validators.required]
    );
    this.durationFormControl = new FormControl(this.duration, [Validators.required]);
    this.locationFormControl = new FormControl(this.location);
    this.coachIdFormControl = new FormControl(this.coachId);
  }

  initializeFormControllerSubscription(): Subscription[] {

    const subArray: Subscription[] = [];

    subArray.push(this.nameFormControl.valueChanges.subscribe(value => {
      this.name = value;
    }))
    subArray.push(this.maxSpotFormControl.valueChanges.subscribe(value => {
      this.maxSpot = value;
    }))
    subArray.push(this.startDateFormControl.valueChanges.subscribe(value => {
      this.startDate = value;
    }))
    subArray.push(this.durationFormControl.valueChanges.subscribe(value => {
      this.duration = value;
    }))
    subArray.push(this.locationFormControl.valueChanges.subscribe(value => {
      this.location = value;
    }))
    subArray.push(this.coachIdFormControl.valueChanges.subscribe(value => {
      this.coachId = value;
    }))

    return subArray;
  }

  seanceToApi(): string {

    this.startDate = new Date(new Date(this.startDate).toJSON());
    return JSON.stringify(
      this,
      [
        'name',
        'maxSpot',
        'startDate',
        'duration',
        'location'
      ]);
  }
}
