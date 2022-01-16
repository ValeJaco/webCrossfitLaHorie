import {Component, OnInit} from '@angular/core';
import {Seance} from "../../models/seance";
import {SeancesFacadeService} from "../../services/seances/seances-facade.service";
import {take} from "rxjs";
import {initGenericArrayFromJson} from "../../utils/utils";
import {ResponseEnum} from "../../constants/response-enum";
import {SecurityFacadeService} from "../../services/security/security-facade.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-incoming-seances',
  templateUrl: './my-incoming-seances.component.html',
  styleUrls: ['./my-incoming-seances.component.scss']
})
export class MyIncomingSeancesComponent implements OnInit {

  seancesList: Seance[];

  constructor(
    private seancesFacadeService: SeancesFacadeService,
    private securityFacadeService: SecurityFacadeService,
    private snackBarService: SnackBarService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadSeanceIncomingForUser();
  }

  unsubscribeFromSeance(seanceId: number) {
    this.seancesFacadeService.removeUserFromSeance(
      seanceId,
      this.securityFacadeService.getJwtTokenObject().userId
    ).subscribe(response => {
        if (response.status === ResponseEnum.OK) {
          this.snackBarService.showSuccesSnackBar("SNACKBAR.UNSUBSCRIBE_OK");
          this.loadSeanceIncomingForUser();
        }
      }
    );
  }

  loadSeanceIncomingForUser() {
    this.seancesFacadeService.getIncomingSeancesByUserId(this.securityFacadeService.getJwtTokenObject().userId)
      .pipe(take(1)).subscribe({
        next: response => {
          this.seancesList = initGenericArrayFromJson(Seance, response.body);
        },
        error: err => {
          // SnackBar error getting séance list ?
        }
      }
    )
  }

  goToSeanceDetails(seanceId: number) {
    this.router.navigate(['/seances/' + seanceId]);
  }
}
