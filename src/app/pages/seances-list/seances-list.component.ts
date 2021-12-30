import {Component, OnInit} from '@angular/core';
import {Seance} from "../../models/seance";
import {SeancesFacadeService} from "../../services/seances/seances-facade.service";
import {take} from "rxjs";
import {environment} from "../../../environments/environment";
import {DatePipe} from "@angular/common";

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

  constructor(private seancesFacadeService: SeancesFacadeService) {
  }

  ngOnInit(): void {
    this.seancesFacadeService.getSeances()
      .pipe(take(1))
      .subscribe(seances => {
        if (seances && seances.length > 0) {
          seances.forEach(seance => {
            const dateSearchedKey = this.getDateKey(new Date(seance.startDate));
            if (!this.seancesList.get(dateSearchedKey)) {
              this.seancesList.set(dateSearchedKey, []);
            }
            this.seancesList.get(dateSearchedKey).push(seance);
          })
        }
      })
  }

  goToSeanceDetail(seanceId: any) {
    console.log(seanceId);
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

}
