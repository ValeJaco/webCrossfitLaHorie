import {Component, OnInit} from '@angular/core';
import {Seance} from "../../models/seance";
import {SeancesFacadeService} from "../../services/seances/seances-facade.service";
import {environment} from "../../../environments/environment";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {SecurityFacadeService} from "../../services/security/security-facade.service";
import {ResponseEnum} from "../../constants/response-enum";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-seances-list',
  templateUrl: './seances-list.component.html',
  styleUrls: ['./seances-list.component.scss'],
  providers: [DatePipe]
})

export class SeancesListComponent implements OnInit {

  seancesList = new Map<string, Seance[]>();
  startDate = new Date('2021-12-18');
  timeZone = environment.TIMEZONE;
  nbDaysToShow = 7;

  constructor(
    private seancesFacadeService: SeancesFacadeService,
    private router: Router,
    private securityFacadeService: SecurityFacadeService,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.seancesFacadeService.getSeances()
      .subscribe(response => {
        if (response.body && response.body.length > 0) {
          const tempMap = new Map<string, Seance[]>();
          response.body.forEach(seance => {
            const dateSearchedKey = this.getDateKey(new Date(seance.startDate));
            if (!tempMap.get(dateSearchedKey)) {
              tempMap.set(dateSearchedKey, []);
            }
            tempMap.get(dateSearchedKey).push(seance);
          })
          this.seancesList = tempMap;
        }
      })
    this.seancesFacadeService.loadSeances();
  }

  goToSeanceDetail(seanceId: number) {
    this.router.navigate(['/seances/' + seanceId]);
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
    ).subscribe(response => {
        if (response.status === ResponseEnum.OK) {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.SUBSCRIBE_OK");
          this.seancesFacadeService.loadSeances();
        }
      }
    );
  }

  unsubscribeToSeance(seanceId: number) {
    this.seancesFacadeService.removeUserFromSeance(
      seanceId,
      this.securityFacadeService.getJwtTokenObject().userId
    ).subscribe(response => {
        if (response.status === ResponseEnum.OK) {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.UNSUBSCRIBE_OK");
          this.seancesFacadeService.loadSeances();
        }
      }
    );
  }
}
