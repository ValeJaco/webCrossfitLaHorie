import {SeancePlanning} from "./seance-planning";
import {initGenericArrayFromJson} from "../utils/utils";

export class Planning {

  id: number;
  name: string;
  isActive: boolean;
  postponedWeekNumber: number;
  seancesPlanning: SeancePlanning[];
  readOnly: boolean = true;

  constructor(planning?: Planning) {
    this.copy(planning);
  }

  copy(planning?: Planning) {
    if (planning) {
      this.id = planning.id;
      this.name = planning.name;
      this.postponedWeekNumber = planning.postponedWeekNumber;
      this.isActive = planning.isActive;
      this.seancesPlanning = initGenericArrayFromJson(SeancePlanning, planning.seancesPlanning);
    }
  }

  planningIsActiveToApi(): string {
    return JSON.stringify(
      this,
      ['isActive']
    );
  }

  planningToApi(): string {
    return JSON.stringify(
      this,
      [
        'name',
        'postponedWeekNumber']
    );
  }

}
