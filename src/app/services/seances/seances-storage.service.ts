import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SeancesListResponse} from "../../models/responses/seances-list-response";

@Injectable({
  providedIn: 'root'
})
export class SeancesStorageService {

  seancesResponseReference = new BehaviorSubject<SeancesListResponse>(null);

  constructor() {
  }

  getSeances(): Observable<SeancesListResponse> {
    return this.seancesResponseReference.asObservable();
  }

  setSeances(seanceResponse: SeancesListResponse): void {
    this.seancesResponseReference.next(seanceResponse);
  }

}
