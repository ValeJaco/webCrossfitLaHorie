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
import {User} from "../../models/user";
import {UsersFacadeService} from "../../services/users/users-facade.service";

@Component({
  selector: 'app-seance-details',
  templateUrl: './seance-details.component.html',
  styleUrls: ['./seance-details.component.scss']
})
export class SeanceDetailsComponent implements OnInit {

  seance = new Seance();
  guestSubscription = new Guest();
  paramsSeanceId: number;
  seanceFormSubscriptions: Subscription[] = [];
  usersList: User[] = [];

  guestNameFormControl: FormControl;
  guestCommentFormControl: FormControl;
  userSearchFieldFormControl: FormControl;
  guestNameSubscription: Subscription;
  guestCommentSubscription: Subscription;
  userSearchFieldSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private seancesFacade: SeancesFacadeService,
    private usersFacade: UsersFacadeService,
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

  loadUsersFromApi(searchedName: string) {
    this.usersFacade.getUsersByName(searchedName).pipe(take(1)).subscribe(response => {
      this.usersList = response.body;
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
    this.userSearchFieldSubscription.unsubscribe();
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
            this.snackBarService.showSuccesSnackBar("SNACKBAR.CREATE_SEANCE_OK");
          } else {
            this.snackBarService.showErrorSnackBar("SNACKBAR.CREATE_SEANCE_NOK");
          }
        });
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
    this.userSearchFieldSubscription = this.userSearchFieldFormControl.valueChanges.subscribe(value => {
      this.loadUsersFromApi(value);
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

  addUser(userId: number) {
    console.log(userId);
    //this.usersList = [];
    //this.userSearchFieldFormControl.setValue("", {emitEvent: false})
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
