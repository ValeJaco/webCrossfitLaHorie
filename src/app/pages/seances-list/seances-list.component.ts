import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Seance} from "../../models/seance";
import {SeancesFacadeService} from "../../services/seances/seances-facade.service";
import {environment} from "../../../environments/environment";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {SecurityFacadeService} from "../../services/security/security-facade.service";
import {ResponseEnum} from "../../constants/response-enum";
import {SnackBarService} from "../../services/snack-bar.service";
import {SeanceFilters} from "../../filters/seance-filters";
import {JwtToken} from "../../models/jwt-token";
import {smoothAppearing} from "../../utils/animations";
import {Subscription, take} from "rxjs";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-seances-list',
  templateUrl: './seances-list.component.html',
  styleUrls: ['./seances-list.component.scss'],
  providers: [DatePipe],
  animations: [smoothAppearing]
})

export class SeancesListComponent implements OnInit, OnDestroy {

  seancesList = new Map<string, Seance[]>();
  startDate = new Date(); // new Date('2022-01-10');
  timeZone = environment.TIMEZONE;
  nbDaysToShow = 15;
  filters = new SeanceFilters();
  seancesListSubscription: Subscription;

  @Input()
  userId: number;

  constructor(
    private seancesFacadeService: SeancesFacadeService,
    private router: Router,
    private securityFacadeService: SecurityFacadeService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) {
  }

  ngOnDestroy(): void {
    this.seancesListSubscription.unsubscribe()
  }

  ngOnInit(): void {

    this.filters.startDate = this.startDate;

    this.seancesListSubscription = this.seancesFacadeService.getSeances()
      .subscribe(response => {
        const tempMap = new Map<string, Seance[]>();
        if (response?.body && response.body.length > 0) {
          response.body.forEach(seance => {
            const dateSearchedKey = this.getDateKey(new Date(seance.startDate));
            if (!tempMap.get(dateSearchedKey)) {
              tempMap.set(dateSearchedKey, []);
            }
            tempMap.get(dateSearchedKey).push(new Seance(seance));
          })
        }
        this.seancesList = tempMap;
      });
    this.loadSeances();
  }

  loadSeances(): void {
    if (this.userId > 0) {
      this.seancesFacadeService.loadIncomingSeancesByUserId(this.userId, this.filters.filtersToApi());
    } else {
      this.seancesFacadeService.loadSeances(this.filters.filtersToApi());
    }
  }

  goToSeanceDetails(seanceId: number) {
    this.router.navigate(['/seances/' + seanceId]).then();
  }

  getDateKey(date: Date): string {
    return (
      date.getFullYear().toString() +
      date.getMonth().toString() +
      date.getDate().toString()
    );
  }

  getDateForCalendar(dayToAdd: number): Date {
    const tempDate = new Date(this.startDate);
    tempDate.setDate(tempDate.getDate() + dayToAdd);
    return tempDate;
  }

  subscribeToSeance(seanceId: number) {
    this.seancesFacadeService.addUserToSeance(
      seanceId,
      this.securityFacadeService.getJwtTokenObject().userId
    ).pipe(take(1)).subscribe(response => {
        if (response.status === ResponseEnum.OK) {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.SUBSCRIBE_OK");
          this.loadSeances();
        }
      }
    );
  }

  unsubscribeFromSeance(seanceId: number) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'CONFIRM_UNSUBSCRIBE_TITLE',
        message: 'CONFIRM_UNSUBSCRIBE_MESSAGE'
      }
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.seancesFacadeService.removeUserFromSeance(
          seanceId,
          this.securityFacadeService.getJwtTokenObject().userId
        ).pipe(take(1)).subscribe(response => {
            if (response.status === ResponseEnum.OK) {
              this.snackBarService.showSuccesSnackBar("SNACKBAR.UNSUBSCRIBE_OK");
              this.loadSeances();
            }
          }
        );
      }
    })
  }

  goTPreviousDay() {
    this.startDate.setDate(this.startDate.getDate() - 1);
  }

  goToNextDay() {
    this.startDate.setDate(this.startDate.getDate() + 1);
  }

  goToNewSeance() {
    this.router.navigate(['/seances/new']).then();
  }

  getJwtTokenObject(): JwtToken {
    return this.securityFacadeService.getJwtTokenObject();
  }

  hasRoleCoach(): boolean {
    return this.securityFacadeService.hasRoleCoach();
  }

  deleteSeance(seanceId: number) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'CONFIRM_DELETE_SEANCE_TITLE',
        message: 'CONFIRM_DELETE_SEANCE_MESSAGE'
      }
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.seancesFacadeService.deleteSeance(
          seanceId
        ).pipe(take(1)).subscribe({
            next: response => {
              if (response.status === ResponseEnum.OK) {
                this.snackBarService.showSuccesSnackBar("SNACKBAR.SEANCE_DELETED_OK");
                this.loadSeances();
              }
            },
            error: err => {
              console.log(err);
              this.snackBarService.showSuccesSnackBar("SNACKBAR.SEANCE_DELETED_NOK");
            }
          }
        );
      }
    });
  }
}
