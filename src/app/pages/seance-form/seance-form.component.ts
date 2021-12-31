import {Component, OnInit} from '@angular/core';
import {Seance} from "../../models/seance";
import {Subscription, take} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {SeancesFacadeService} from "../../services/seances/seances-facade.service";
import {DatePipe} from "@angular/common";
import {showSnackBar} from "../../utils/utils";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResponseEnum} from "../../constants/response-enum";

@Component({
  selector: 'app-seance-form',
  templateUrl: './seance-form.component.html',
  styleUrls: ['./seance-form.component.scss']
})
export class SeanceFormComponent implements OnInit {

  seance = new Seance();
  pramsSeanceId: number;
  seanceFormSubscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private seancesFacade: SeancesFacadeService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.seance.initializeFormController(this.datePipe);
    this.pramsSeanceId = Number(this.route.snapshot.paramMap.get('id'));

    if (!
      this.pramsSeanceId || isNaN(this.pramsSeanceId)
    ) {
      this.seanceFormSubscriptions = this.seance.initializeFormControllerSubscription();
    } else {
      this.seancesFacade.getSeanceById(this.pramsSeanceId).pipe(take(1)).subscribe(response => {
        this.seance = new Seance(response.body);
        this.unsubscribeFromSeeanceFormControllers();
        this.seance.initializeFormController(this.datePipe);
        this.seanceFormSubscriptions = this.seance.initializeFormControllerSubscription();
      })
    }
  }

  unsubscribeFromSeeanceFormControllers(): void {
    this.seanceFormSubscriptions.forEach(sub =>
      sub.unsubscribe()
    )
    this.seanceFormSubscriptions = [];
  }

  unsubscribeFromAll(): void {
    this.unsubscribeFromSeeanceFormControllers();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAll();
  }

  postSeanceForm(): void {

    if (this.seance.id > 0) {
      this.seancesFacade.updateSeance(
        this.seance.id,
        this.seance.seanceToApi())
        .pipe(take(1))
        .subscribe(response => {
          if (response.status === ResponseEnum.OK) {
            showSnackBar(
              this.snackBar,
              'SNACKBAR.UPDATE_SEANCE_OK',
              'success-snackbar',
              'check'
            );
          } else {
            showSnackBar(
              this.snackBar,
              'SNACKBAR.UPDATE_SEANCE_NOK',
              'error-snackbar',
              'error'
            );
          }

        });
    } else {
      this.seancesFacade.createSeance(
        this.seance.seanceToApi())
        .pipe(take(1))
        .subscribe(response => {
          if (response.status === ResponseEnum.OK) {
            this.seance.id = response.body.id;
            showSnackBar(
              this.snackBar,
              'SNACKBAR.CREATE_SEANCE_OK',
              'success-snackbar',
              'check'
            );
          } else {
            showSnackBar(
              this.snackBar,
              'SNACKBAR.CREATE_SEANCE_NOK',
              'error-snackbar',
              'error'
            );
          }
        });
    }
  }
}
