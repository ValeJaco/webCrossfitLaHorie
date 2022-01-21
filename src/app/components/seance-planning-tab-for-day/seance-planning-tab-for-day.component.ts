import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeancePlanning} from "../../models/seance-planning";
import {environment} from "../../../environments/environment";
import {smoothAppearing} from "../../utils/animations";

@Component({
  selector: 'app-seance-planning-tab-for-day',
  templateUrl: './seance-planning-tab-for-day.component.html',
  styleUrls: ['./seance-planning-tab-for-day.component.scss'],
  animations: [smoothAppearing]
})
export class SeancePlanningTabForDayComponent implements OnInit {

  @Input()
  seancesPlanning: SeancePlanning[] = [];
  timeZone = environment.TIMEZONE;

  @Output()
  validateSeancePlanningFormEmitter = new EventEmitter<SeancePlanning>();

  @Output()
  deleteSeancePlanningEmitter = new EventEmitter<SeancePlanning>();

  constructor() {
  }

  ngOnInit(): void {
  }

  editSeancePlanning(seancePlanning: SeancePlanning): void {
    seancePlanning.readOnly = false;
  }

  validateSeancePlanningForm(newSeancePlanning: SeancePlanning) {
    this.validateSeancePlanningFormEmitter.emit(newSeancePlanning);
  }

  deleteSeancePlanning(seancePlanningToDelete: SeancePlanning) {
    this.deleteSeancePlanningEmitter.emit(seancePlanningToDelete);
  }

}
