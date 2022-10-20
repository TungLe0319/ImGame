import { Account } from "../Account.js";


export class GameNight {
  constructor(data) {
    this.id = data.id;
    this.groupId = data.groupId;
    this.game = data.game
    this.groupMemberIds = data.groupMemberIdsAttending.flat().map( g => new Account(g))
    this.location = data.location;
    this.startDate = data.startDate; //TODO do a new Date(data.startDate).tolocaldatestring('en-US')
  }
}
