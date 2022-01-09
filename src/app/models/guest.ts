export class Guest {

  id: number;
  guestName: string
  seanceId: number;
  coachName: string;
  comment?: string;

  constructor(guest?: any) {
    this.copy(guest);
  }

  copy(guest?: Guest) {
    if (guest) {
      this.id = guest.id;
      this.guestName = guest.guestName;
      this.seanceId = guest.seanceId;
      this.coachName = guest.coachName;
      this.comment = guest.comment;
    }
  }

}
