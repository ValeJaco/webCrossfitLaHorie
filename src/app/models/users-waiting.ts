export class UsersWaiting {

  id: number;
  seanceId: number;
  userId: number;
  subscriptionTime: Date;

  constructor(userWaiting?: UsersWaiting) {
    this.copy(userWaiting);
  }

  copy(userWaiting: UsersWaiting) {
    if (userWaiting) {
      this.id = userWaiting.id;
      this.seanceId = userWaiting.seanceId;
      this.userId = userWaiting.userId;
      this.subscriptionTime = userWaiting.subscriptionTime;
    }
  }
  
}
