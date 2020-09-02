import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../shared/models/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users: User[] = [];
  private _usersSubject = new BehaviorSubject(this._users);
  public users$ = this._usersSubject.asObservable();

  constructor() { }

  nextUsers(users: User[]) {
    this._users = users;
    this._usersSubject.next(this._users);
  }

  nextUserUpdated(user: User) {
    if (user) {
      const index = this._users.findIndex( s => s.id == user.id );
      this._users[index] = user;
      this._usersSubject.next(this._users);
    }
  }

  nextPlaceCreated(user: User) {
    if (user) {
      this._users.push(user);
      this._usersSubject.next(this._users);
    }
  }

  nextPlaceDeleted(user: User) {
    if (user) {
      let index: number = this._users.findIndex( s => s.id == user.id );
      this._users.slice(index);
      this._usersSubject.next(this._users);
    }
  }

}
