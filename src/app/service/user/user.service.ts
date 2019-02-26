import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/model/user/user.model';

@Injectable()
export class UserService {

  private userSource = new BehaviorSubject(new User);
  userCurrent = this.userSource.asObservable();

  constructor() { }

  changeUser(user: User) {
    this.userSource.next(user);
  }
}
