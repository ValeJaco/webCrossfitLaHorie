import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seance} from "../../models/seance";
import {JwtToken} from "../../models/jwt-token";
import {SecurityFacadeService} from "../../services/security/security-facade.service";
import {environment} from "../../../environments/environment";
import {smoothAppearing} from "../../utils/animations";

@Component({
  selector: 'app-seance-card',
  templateUrl: './seance-card.component.html',
  styleUrls: ['./seance-card.component.scss'],
  animations: [smoothAppearing]
})
export class SeanceCardComponent implements OnInit {

  @Input()
  seance: Seance
  @Input()
  showDate = false;

  timeZone = environment.TIMEZONE;
  showSeanceMenu: false;

  @Output()
  subscribeToSeanceChangeEmitter = new EventEmitter<number>();
  @Output()
  unsubscribeFromSeanceChangeEmitter = new EventEmitter<number>();
  @Output()
  goToSeanceDetailChangeEmitter = new EventEmitter<number>();

  constructor(private securityFacadeService: SecurityFacadeService) {
  }

  ngOnInit(): void {
  }

  getJwtTokenObject(): JwtToken {
    return this.securityFacadeService.getJwtTokenObject();
  }

  hasRoleCoach(): boolean {
    return this.securityFacadeService.hasRoleCoach();
  }

  subscribeToSeance(id: number) {
    this.subscribeToSeanceChangeEmitter.emit(id)
    this.seance = new Seance(this.seance);
  }

  unsubscribeToSeance(id: number) {
    this.unsubscribeFromSeanceChangeEmitter.emit(id)
    this.seance = new Seance(this.seance);
  }

  goToSeanceDetails(id: number) {
    this.goToSeanceDetailChangeEmitter.emit(id);
  }
}
