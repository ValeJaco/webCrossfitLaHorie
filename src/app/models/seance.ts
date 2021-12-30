import {User} from "./user";
import {initGenericArrayFromJson} from "../utils/utils";

export class Seance {

  id: number;
  name: string;
  maxSpot: number;
  startDate: Date;
  duration: number;
  location: string;
  coachId: number;
  users: User[];

  constructor(seance?: Seance | any) {
    this.copy(seance);
  }

  copy(seance: Seance) {
    if (seance) {
      this.id = seance.id;
      this.name = seance.name;
      this.startDate = seance.startDate;
      this.duration = seance.duration;
      this.location = seance.location;
      this.coachId = seance.coachId;
      this.users = initGenericArrayFromJson(User, seance.users);
    }
  }

}
