import { Account } from './Account.js';

export class Group {
  constructor(data) {
    this.id = data.id;
    this.createdAt = data.createdAt;
 this.groupId=data.groupId
// this.profile = new Account(data.profile)
this.group=data.group
// this.creator = new Account(data.creator)
  this.coverImg=data.group.coverImg
    this.name = data.group.name;
    this.groupMemberIds = data.groupMemberIds;
  }
}
