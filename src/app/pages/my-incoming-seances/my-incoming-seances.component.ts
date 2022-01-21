import {Component, OnInit} from '@angular/core';
import {Seance} from "../../models/seance";
import {SecurityFacadeService} from "../../services/security/security-facade.service";

@Component({
  selector: 'app-my-incoming-seances',
  templateUrl: './my-incoming-seances.component.html',
  styleUrls: ['./my-incoming-seances.component.scss']
})
export class MyIncomingSeancesComponent implements OnInit {

  seancesList: Seance[];

  constructor(
    private securityFacadeService: SecurityFacadeService) {
  }

  ngOnInit(): void {
  }

  getUserId(): number {
    return this.securityFacadeService.getJwtTokenObject().userId;
  }
}
