import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

export class SeancePlanning {

  id: number;
  planningId: number;
  dayOfWeek: number;
  typeSemaine: string;
  name: string;
  maxSpot: number;
  startTime: string;
  duration: number;
  location: string;
  seanceType: string = 'ROLE_MEMBER';
  // coachId: number;
  unsubscriptionHoursLimit: number;

  readOnly = true;

  nameFormControl: FormControl;
  maxSpotFormControl: FormControl;
  startTimeFormControl: FormControl;
  durationFormControl: FormControl;
  locationFormControl: FormControl;
  coachIdFormControl: FormControl;
  unsubscriptionHoursLimitFormControl: FormControl;

  constructor(seancePlanning?: SeancePlanning) {
    this.copy(seancePlanning);
    this.initializeFormController();
  }

  copy(seancePlanning?: SeancePlanning) {
    if (seancePlanning) {
      this.id = seancePlanning.id;
      this.planningId = seancePlanning.planningId;
      this.dayOfWeek = seancePlanning.dayOfWeek;
      this.typeSemaine = seancePlanning.typeSemaine;
      this.name = seancePlanning.name;
      this.maxSpot = seancePlanning.maxSpot;
      this.startTime = seancePlanning.startTime;
      this.duration = seancePlanning.duration;
      this.location = seancePlanning.location;
      this.seanceType = seancePlanning.seanceType;
      // this.coachId = seancePlanning.coachId;
      this.unsubscriptionHoursLimit = seancePlanning.unsubscriptionHoursLimit;
    }
  }

  valid(): boolean {
    return this.nameFormControl.valid &&
      this.startTimeFormControl.valid &&
      this.durationFormControl.valid &&
      this.maxSpotFormControl.valid &&
      this.locationFormControl.valid &&
      this.unsubscriptionHoursLimitFormControl.valid
  }

  initializeFormController(): void {
    this.nameFormControl = new FormControl(this.name, [Validators.required]);
    this.startTimeFormControl = new FormControl(this.startTime, [Validators.required]);
    this.durationFormControl = new FormControl(this.duration, [Validators.required, Validators.min(1)]);
    this.maxSpotFormControl = new FormControl(this.maxSpot, [Validators.required, Validators.min(1)]);
    // this.coachIdFormControl = new FormControl(this.coachId);
    this.locationFormControl = new FormControl(this.location);
    this.unsubscriptionHoursLimitFormControl = new FormControl(this.unsubscriptionHoursLimit, [Validators.required, Validators.min(1)]);
  }

  initializeFormControllerSubscription(): Subscription[] {

    const subArray: Subscription[] = [];

    subArray.push(this.nameFormControl.valueChanges.subscribe(value => {
      this.name = value;
      console.log(value);
    }))
    subArray.push(this.startTimeFormControl.valueChanges.subscribe(value => {
      this.startTime = value + ":00";
    }))
    subArray.push(this.durationFormControl.valueChanges.subscribe(value => {
      this.duration = value;
    }))
    subArray.push(this.maxSpotFormControl.valueChanges.subscribe(value => {
      this.maxSpot = value;
    }))
    // subArray.push(this.coachIdFormControl.valueChanges.subscribe(value => {
    //   this.coachId = value;
    // }))
    subArray.push(this.locationFormControl.valueChanges.subscribe(value => {
      this.location = value;
    }))
    subArray.push(this.unsubscriptionHoursLimitFormControl.valueChanges.subscribe(value => {
      this.unsubscriptionHoursLimit = value;
    }))
    return subArray;
  }

  /**
   * If specified objectName, add prefix to json like { objectName : initial_json }
   * @param objectName
   */
  seancePlanningToApi(objectName?: string): string {

    let prefix = "";
    let suffix = "";

    if (objectName && objectName.length > 0) {
      prefix = `{ "${objectName}" :`;
      suffix = '}';
    }

    return prefix + JSON.stringify(
      this,
      [
        'planningId',
        'dayOfWeek',
        'typeSemaine',
        'name',
        'maxSpot',
        'startTime',
        'duration',
        'location',
        'unsubscriptionHoursLimit',
        'seanceType'
      ]) + suffix;
  }
}
