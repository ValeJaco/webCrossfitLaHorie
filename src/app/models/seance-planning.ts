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
  coachId: number;
  unsubcriptionHoursLimit: number;

  readOnly = true;

  nameFormController: FormControl;
  maxSpotFormController: FormControl;
  startTimeFormController: FormControl;
  durationFormController: FormControl;
  locationFormController: FormControl;
  coachIdFormController: FormControl;
  unsubcriptionHoursLimitFormControl: FormControl;

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
      this.coachId = seancePlanning.coachId;
      this.unsubcriptionHoursLimit = seancePlanning.unsubcriptionHoursLimit;
    }
  }

  initializeFormController(): void {
    this.nameFormController = new FormControl(this.name, [Validators.required]);
    this.startTimeFormController = new FormControl(this.startTime, [Validators.required]);
    this.durationFormController = new FormControl(this.duration, [Validators.required]);
    this.maxSpotFormController = new FormControl(this.maxSpot, [Validators.required]);
    this.coachIdFormController = new FormControl(this.coachId);
    this.locationFormController = new FormControl(this.location);
    this.unsubcriptionHoursLimitFormControl = new FormControl(this.unsubcriptionHoursLimit, [Validators.required]);
  }

  initializeFormControllerSubscription(): Subscription[] {

    const subArray: Subscription[] = [];

    subArray.push(this.nameFormController.valueChanges.subscribe(value => {
      this.name = value;
      console.log(value);
    }))
    subArray.push(this.startTimeFormController.valueChanges.subscribe(value => {
      this.startTime = value + ":00";
    }))
    subArray.push(this.durationFormController.valueChanges.subscribe(value => {
      this.duration = value;
    }))
    subArray.push(this.maxSpotFormController.valueChanges.subscribe(value => {
      this.maxSpot = value;
    }))
    subArray.push(this.coachIdFormController.valueChanges.subscribe(value => {
      this.coachId = value;
    }))
    subArray.push(this.locationFormController.valueChanges.subscribe(value => {
      this.location = value;
    }))
    subArray.push(this.unsubcriptionHoursLimitFormControl.valueChanges.subscribe(value => {
      this.unsubcriptionHoursLimit = value;
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
        'coachId',
        'unsubcriptionHoursLimit'
      ]) + suffix;
  }
}
