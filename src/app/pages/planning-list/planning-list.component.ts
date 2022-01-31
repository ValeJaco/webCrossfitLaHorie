import {Component, OnDestroy, OnInit} from '@angular/core';
import {Planning} from "../../models/planning";
import {FormControl, Validators} from "@angular/forms";
import {Subscription, take} from "rxjs";
import {SeancesPlanningFacadeService} from "../../services/seancesPlanning/seances-planning-facade.service";
import {Router} from "@angular/router";
import {ResponseEnum} from "../../constants/response-enum";
import {SnackBarService} from "../../services/snack-bar.service";
import {initGenericArrayFromJson} from "../../utils/utils";
import {smoothAppearing} from "../../utils/animations";

@Component({
  selector: 'app-planning-management',
  templateUrl: './planning-list.component.html',
  styleUrls: ['./planning-list.component.scss'],
  animations: [smoothAppearing]
})
export class PlanningListComponent implements OnInit, OnDestroy {

  planning: Planning;
  plannings: Planning[];

  nameFormControl: FormControl;
  nameSubscription: Subscription;

  constructor(
    private seancesFacadeService: SeancesPlanningFacadeService,
    private router: Router,
    private snackBarService: SnackBarService) {
  }

  ngOnDestroy(): void {
    this.nameSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.planning = new Planning();
    this.loadAllPlannings();
    this.initializeFormController();
    this.initializeFormControllerSubscription();
  }

  initializeFormController(): void {
    this.nameFormControl = new FormControl("", [Validators.required]);
  }

  initializeFormControllerSubscription(): void {
    this.nameSubscription = this.nameFormControl.valueChanges.subscribe(value => {
      this.planning.name = value;
    })
  }

  createPlanning(): void {
    this.seancesFacadeService.createPlanning(this.planning.planningToApi()).subscribe(response => {
      if (response.status === ResponseEnum.OK) {
        this.nameFormControl.setValue("");
        this.goToPlanningDetails(response.body.id)
      }
    })
  }

  loadAllPlannings(): void {
    this.seancesFacadeService.getPlannings().pipe(take(1)).subscribe(response => {
      this.plannings = initGenericArrayFromJson(Planning, response.body);
    })
  }

  goToPlanningDetails(planningId: number): void {
    this.router.navigate(['/planning/' + planningId]).then();
  }

  toogleDefaultPlanning(planning: Planning): void {
    planning.isActive = !planning.isActive;
    this.seancesFacadeService.patchPlanning(planning.id, planning.planningIsActiveToApi())
      .pipe(take(1)).subscribe({
      next: () => {
        this.snackBarService.showSuccesSnackBar("SNACKBAR.SET_PLANNING_ACTIVE_OK");
        this.loadAllPlannings();
      },
      error: () => {
        this.snackBarService.showErrorSnackBar("SNACKBAR.SET_PLANNING_ACTIVE_NOK");
        this.loadAllPlannings();
      }
    });
  }

}
