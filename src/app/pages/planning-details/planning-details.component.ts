import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Planning} from "../../models/planning";
import {SeancesPlanningFacadeService} from "../../services/seancesPlanning/seances-planning-facade.service";
import {Subscription, take} from "rxjs";
import {ResponseEnum} from "../../constants/response-enum";
import {SeancePlanning} from "../../models/seance-planning";
import {SnackBarService} from "../../services/snack-bar.service";
import {FormControl, Validators} from "@angular/forms";
import {slideInOutLeftToRight, smoothAppearing} from "../../utils/animations";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-planning-details',
  templateUrl: './planning-details.component.html',
  styleUrls: ['./planning-details.component.scss'],
  animations: [smoothAppearing, slideInOutLeftToRight]
})
export class PlanningDetailsComponent implements OnInit {

  nbDaysToShow = 7;
  planning: Planning;
  seancesList = new Map<number, SeancePlanning[]>();
  paramsPlanningId: number;
  seancesPlanningFormSubscriptions: Subscription[] = [];
  planningNameSubscriptions: Subscription;
  postponedWeekNumberSubscriptions: Subscription;

  nameFormControl: FormControl;
  postponedWeekNumberFormControl: FormControl;

  displayedColumns = ['seanceName', 'startTime', 'duration', 'maxSpot', 'unsubscribeHoursLimit', 'coach', 'location', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seancesPlanningFacadeService: SeancesPlanningFacadeService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.planning = new Planning();
    this.paramsPlanningId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeFormController();

    if (!this.paramsPlanningId || isNaN(this.paramsPlanningId)
    ) {
      this.redirectToPlanningList();
    } else {
      this.loadPlanning();
    }
  }

  loadPlanning(): void {


    this.seancesPlanningFacadeService.getPlanningById(this.paramsPlanningId)
      .pipe(take(1)).subscribe({
      next: (response) => {
        if (response.status === ResponseEnum.OK) {
          this.unsubscribeFromAll();
          this.planning = new Planning(response.body);
          this.planning.readOnly = true;
          this.initializeFormController();
          this.initializeFormControllerSubscription();
          let tempMap = new Map<number, SeancePlanning[]>();

          this.planning.seancesPlanning.forEach(seancePlanning => {
            if (!tempMap.get(seancePlanning.dayOfWeek)) {
              tempMap.set(seancePlanning.dayOfWeek, []);
            }
            const currentSeance = new SeancePlanning(seancePlanning);
            this.addSubscriptionsToCurrentList(currentSeance.initializeFormControllerSubscription())
            tempMap.get(seancePlanning.dayOfWeek).push(currentSeance);
          })
          this.seancesList = tempMap;
        }
      },
      error: (err) => {
        console.info(err);
        this.redirectToPlanningList()
      }
    })
  }

  redirectToPlanningList() {
    this.router.navigate(['/planning']).then();
  }

  unsubscribeFromAll() {
    this.unsubscribeFromseancesPlanningFormControllers();
    if (this.planningNameSubscriptions) {
      this.planningNameSubscriptions.unsubscribe();
    }
    if (this.postponedWeekNumberSubscriptions) {
      this.postponedWeekNumberSubscriptions.unsubscribe();
    }
  }

  unsubscribeFromseancesPlanningFormControllers(): void {
    this.seancesPlanningFormSubscriptions.forEach(sub =>
      sub.unsubscribe()
    )
    this.seancesPlanningFormSubscriptions = [];
  }

  editPlanningName(): void {
    this.planning.readOnly = false;
  }

  savePlanningInformations(): void {
    if (this.nameFormControl.valid && this.postponedWeekNumberFormControl.valid) {
      this.seancesPlanningFacadeService
        .patchPlanning(this.planning.id, this.planning.planningToApi())
        .pipe(take(1)).subscribe({
        next: () => {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.PLANNING_NAME_UPDATED_OK")
        }, error: () => this.snackBarService.showErrorSnackBar("SNACKBAR.PLANNING_NAME_UPDATED_NOK")
      });
      this.planning.readOnly = true;
    } else {
      this.snackBarService.showWarningSnackBar("SNACKBAR.FORM_INCORRECT_DATA")
    }
  }

  editSeancePlanning(seancePlanning: SeancePlanning): void {
    seancePlanning.readOnly = false;
  }

  validateSeancePlanningForm(seancePlanning: SeancePlanning): void {
    if (seancePlanning.valid()) {
      if (seancePlanning.id > 0) {
        this.seancesPlanningFacadeService
          .patchSeancePlanning(seancePlanning.id, seancePlanning.seancePlanningToApi())
          .pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.showSuccesSnackBar("SNACKBAR.SEANCE_PLANNING_UPDATED_OK")
          }, error: () => this.snackBarService.showErrorSnackBar("SNACKBAR.SEANCE_PLANNING_UPDATED_NOK")
        });
      } else {
        this.seancesPlanningFacadeService
          .addSeancesToPlanning(seancePlanning.seancePlanningToApi())
          .pipe(take(1)).subscribe({
          next: (response) => {
            this.snackBarService.showSuccesSnackBar("SNACKBAR.SEANCE_PLANNING_CREATED_OK")
            seancePlanning.id = response.body.id;
          },
          error: () => this.snackBarService.showErrorSnackBar("SNACKBAR.SEANCE_PLANNING_CREATED_NOK")
        });
      }

      seancePlanning.readOnly = true;
    } else {
      this.snackBarService.showWarningSnackBar("SNACKBAR.FORM_INCORRECT_DATA")
    }
  }

  removeSeanceFromPlanning(seancePlanning: SeancePlanning): void {

    if (seancePlanning.id > 0) {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'CONFIRM_DELETE_SEANCE_TITLE',
          message: 'CONFIRM_DELETE_SEANCE_MESSAGE'
        }
      });
      confirmDialog.afterClosed().subscribe((result) => {
        if (result === true) {
          this.seancesPlanningFacadeService
            .deleteSeancePlanning(seancePlanning.id)
            .pipe(take(1)).subscribe({
            next: () => {
              this.snackBarService.showSuccesSnackBar("SNACKBAR.SEANCE_PLANNING_DELETED_OK");
              const seanceToDeleteIndexInPlanning = this.planning.seancesPlanning.findIndex(sp => sp.id === seancePlanning.id);
              const seanceToDeleteIndexInMap = this.seancesList.get(seancePlanning.dayOfWeek).findIndex(sp => sp.id === seancePlanning.id);

              if (seanceToDeleteIndexInPlanning > -1) {
                this.planning.seancesPlanning.splice(seanceToDeleteIndexInPlanning, 1);
                this.planning.seancesPlanning = [...this.planning.seancesPlanning];
              }
              if (seanceToDeleteIndexInMap > -1) {
                this.seancesList.get(seancePlanning.dayOfWeek).splice(seanceToDeleteIndexInMap, 1);
                this.seancesList.set(seancePlanning.dayOfWeek, [...this.seancesList.get(seancePlanning.dayOfWeek)]);
              }
            }, error: () => {
              this.snackBarService.showErrorSnackBar("SNACKBAR.SEANCE_PLANNING_DELETED_NOK");
            }
          });
        }
      });
    } else {
      this.planning.seancesPlanning = [...this.planning.seancesPlanning.filter(seancePlanning => seancePlanning.id > 0)];
      this.seancesList.set(seancePlanning.dayOfWeek, [...this.seancesList.get(seancePlanning.dayOfWeek).filter(seancePlanning => seancePlanning.id > 0)]);
    }
  }


  initializeFormController() {
    this.nameFormControl = new FormControl(this.planning.name, [Validators.required]);
    this.postponedWeekNumberFormControl = new FormControl(this.planning.postponedWeekNumber, [Validators.required, Validators.min(2)]);
  }

  initializeFormControllerSubscription() {
    this.planningNameSubscriptions = this.nameFormControl.valueChanges.subscribe(value => {
      this.planning.name = value;
    });
    this.postponedWeekNumberSubscriptions = this.postponedWeekNumberFormControl.valueChanges.subscribe(value => {
      this.planning.postponedWeekNumber = value;
    });
  }

  addSubscriptionsToCurrentList(subArray: Subscription[]) {
    this.seancesPlanningFormSubscriptions = [
      ...this.seancesPlanningFormSubscriptions,
      ...subArray
    ];
  }

  createNewSeance(dayOfWeek: number) {
    const newSeance = new SeancePlanning();

    newSeance.planningId = this.planning.id;
    newSeance.dayOfWeek = dayOfWeek;
    newSeance.readOnly = false;
    // newSeance.name = "test";
    // newSeance.startTime = "18:30:00";
    // newSeance.unsubscriptionHoursLimit = 6;
    // newSeance.duration = 60;
    // newSeance.maxSpot = 12;

    newSeance.initializeFormController();
    this.addSubscriptionsToCurrentList(newSeance.initializeFormControllerSubscription())

    if (!this.seancesList.get(dayOfWeek)) {
      this.seancesList.set(dayOfWeek, []);
    }
    this.seancesList.set(dayOfWeek, [...this.seancesList.get(dayOfWeek), newSeance]);
  }

}
