import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Seance} from "../../models/seance";

@Component({
  selector: 'app-planning-management',
  templateUrl: './planning-management.component.html',
  styleUrls: ['./planning-management.component.scss']
})
export class PlanningManagementComponent implements OnInit {

  nbDaysToShow = 7;
  seancesList = new Map<number, Seance[]>();

  seanceNameFormController: FormControl;
  startDateFormController: FormControl;
  dureeSeanceFormController: FormControl;
  maxSpotFormController: FormControl;
  coachIdFormController: FormControl;
  locationFormController: FormControl;

  displayedColumns = ['seanceName', 'startDate', 'duration', 'maxSpot', 'coach', 'location', 'actions'];

  constructor() {
  }

  ngOnInit(): void {

    const seance = new Seance({
      id: 0,
      name: "Name",
      maxSpot: 12,
      startDate: new Date(),
      duration: 90,
      location: "Location",
      coachId: 3,
      users: [],
      usersWaiting: [],
      guests: [],

    })

    const seances = [seance, seance];
    this.seancesList.set(0, seances);
    this.seancesList.set(1, seances);
    this.seancesList.set(2, seances);
    this.seancesList.set(3, seances);
    this.seancesList.set(4, seances);
    this.seancesList.set(5, seances);
    this.initializeFormController();
  }

  initializeFormController(): void {
    this.seanceNameFormController = new FormControl("", [Validators.required]);
    this.startDateFormController = new FormControl("", [Validators.required]);
    this.dureeSeanceFormController = new FormControl("", [Validators.required]);
    this.maxSpotFormController = new FormControl("", [Validators.required]);
    this.coachIdFormController = new FormControl("", [Validators.required]);
    this.locationFormController = new FormControl("", [Validators.required]);
  }

}
