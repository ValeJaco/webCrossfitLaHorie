import {Component, OnInit} from '@angular/core';
import {Seance} from "../../models/seance";
import {Subscription, take} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {SeancesFacadeService} from "../../services/seances/seances-facade.service";
import {DatePipe} from "@angular/common";
import {ResponseEnum} from "../../constants/response-enum";
import {SnackBarService} from "../../services/snack-bar.service";
import {Guest} from "../../models/guest";
import {SecurityFacadeService} from "../../services/security/security-facade.service";
import {FormControl, Validators} from "@angular/forms";
import {smoothAppearing} from "../../utils/animations";

@Component({
  selector: 'app-seance-details',
  templateUrl: './seance-details.component.html',
  styleUrls: ['./seance-details.component.scss'],
  animations: [smoothAppearing]
})
export class SeanceDetailsComponent implements OnInit {

  seance = new Seance();
  guestSubscription = new Guest();
  paramsSeanceId: number;
  seanceFormSubscriptions: Subscription[] = [];
  selectedUserId: number;

  guestNameFormControl: FormControl;
  guestCommentFormControl: FormControl;
  userSearchFieldFormControl: FormControl;
  guestNameSubscription: Subscription;
  guestCommentSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private seancesFacade: SeancesFacadeService,
    private datePipe: DatePipe,
    private snackBarService: SnackBarService,
    private securityFacadeService: SecurityFacadeService
  ) {
  }

  ngOnInit(): void {

    this.seance.initializeFormController(this.datePipe);
    this.paramsSeanceId = Number(this.route.snapshot.paramMap.get('id'));
    this.initialiseFormController();
    this.initialiseFormSubscriptions();

    if (!this.paramsSeanceId || isNaN(this.paramsSeanceId)
    ) {
      this.seanceFormSubscriptions = this.seance.initializeFormControllerSubscription();
    } else {
      this.loadSeanceFromApi();
    }
  }

  loadSeanceFromApi() {
    this.seancesFacade.getSeanceById(this.paramsSeanceId).pipe(take(1)).subscribe(response => {
      this.seance = new Seance(response.body);
      this.unsubscribeFromSeeanceFormControllers();
      this.seance.initializeFormController(this.datePipe);
      this.seanceFormSubscriptions = this.seance.initializeFormControllerSubscription();
      this.guestSubscription.seanceId = this.seance.id;
      this.guestSubscription.coachName =
        this.securityFacadeService.getJwtTokenObject().foreName + " " +
        this.securityFacadeService.getJwtTokenObject().lastName;
    })
  }

  unsubscribeFromSeeanceFormControllers(): void {
    this.seanceFormSubscriptions.forEach(sub =>
      sub.unsubscribe()
    )
    this.seanceFormSubscriptions = [];
  }

  unsubscribeFromAll(): void {
    this.unsubscribeFromSeeanceFormControllers();
    this.guestNameSubscription.unsubscribe();
    this.guestCommentSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAll();
  }

  postSeanceForm(): void {
    if (this.seance.valid()) {
      if (this.seance.id > 0) {
        this.seancesFacade.updateSeance(
          this.seance.id,
          this.seance.seanceToApi())
          .pipe(take(1))
          .subscribe(response => {
            if (response.status === ResponseEnum.OK) {
              this.snackBarService.showSuccesSnackBar("SNACKBAR.UPDATE_SEANCE_OK");
            } else {
              this.snackBarService.showErrorSnackBar("SNACKBAR.UPDATE_SEANCE_NOK");
            }
          });
      } else {
        this.seancesFacade.createSeance(
          this.seance.seanceToApi())
          .pipe(take(1))
          .subscribe(response => {
            if (response.status === ResponseEnum.OK) {
              this.seance.id = response.body.id;
              this.paramsSeanceId = this.seance.id;
              this.snackBarService.showSuccesSnackBar("SNACKBAR.CREATE_SEANCE_OK");
            } else {
              this.snackBarService.showErrorSnackBar("SNACKBAR.CREATE_SEANCE_NOK");
            }
          });
      }
    } else {
      this.snackBarService.showWarningSnackBar("SNACKBAR.FORM_INCORRECT_DATA");
    }
  }

  initialiseFormController() {
    this.guestNameFormControl = new FormControl("", [Validators.required])
    this.guestCommentFormControl = new FormControl();
    this.userSearchFieldFormControl = new FormControl("", [Validators.required])
  }

  initialiseFormSubscriptions() {
    this.guestNameSubscription = this.guestNameFormControl.valueChanges.subscribe(value => {
      this.guestSubscription.guestName = value;
    })
    this.guestCommentSubscription = this.guestCommentFormControl.valueChanges.subscribe(value => {
      this.guestSubscription.comment = value;
    })
  }

  addGuest(): void {
    if (this.guestNameFormControl.valid) {
      this.seancesFacade.addGuestToSeance(this.guestSubscription).subscribe(response => {
        if (response.status === ResponseEnum.OK) {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.GUESS_ADDED_OK");
          this.guestCommentFormControl.setValue("");
          this.guestNameFormControl.setValue("");
          this.loadSeanceFromApi();
        }
      })
    }
  }

  changeSelectedUser(userId: number) {
    this.selectedUserId = userId;
  }

  addUser() {
    if (this.selectedUserId && this.selectedUserId > 0 && this.userSearchFieldFormControl.valid) {
      this.seancesFacade.addUserToSeance(this.seance.id, this.selectedUserId).subscribe(response => {
        if (response.status === ResponseEnum.OK) {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.SUBSCRIBE_OK");
          this.loadSeanceFromApi();
          this.userSearchFieldFormControl.setValue("");
        }
      })
    }
  }

  removeUser(userId: number) {
    this.seancesFacade.removeUserFromSeance(this.seance.id, userId).subscribe(response => {
      if (response.status === ResponseEnum.OK) {
        this.seance.id = response.body.id;
        this.snackBarService.showSuccesSnackBar("SNACKBAR.UNSUBSCRIBE_OK");
        this.loadSeanceFromApi();
      }
    })
  }

  removeGuest(guestLineId: number) {
    this.seancesFacade.removeGuestFromSeance(guestLineId).subscribe(response => {
      if (response.status === ResponseEnum.OK) {
        this.seance.id = response.body.id;
        this.snackBarService.showSuccesSnackBar("SNACKBAR.UNSUBSCRIBE_OK");
        this.loadSeanceFromApi();
      }
    })
  }
}
