import {SeancePlanning} from "./seance-planning";
import {initGenericArrayFromJson} from "../utils/utils";

export class Planning {

  id: number;
  name: string;
  isActive: boolean;
  seancesPlanning: SeancePlanning[];
  readOnly: boolean = true;

  constructor(planning?: Planning) {
    this.copy(planning);
  }

  copy(planning?: Planning) {
    if (planning) {
      this.id = planning.id;
      this.name = planning.name;
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

  planningNameToApi(): string {
    return JSON.stringify(
      this,
      ['name']
    );
  }

}
