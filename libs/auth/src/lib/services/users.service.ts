import { RestService } from '@angular.builders/data';
import { Injectable } from '@angular/core';
import { User } from '../routes/models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endPoint = 'users';
  constructor(private rest: RestService<User>) {}

  logIn(user: User) {
    this.fakeFillUser(user);
    return this.rest.post(this.endPoint, user);
  }

  private fakeFillUser(user: User) {
    // Hack: Will be done at server side
    user.name = user.name ?? user.email;
    user.id = user.id ?? user.name.replace(' ', '');
    user.atk = 'secretRandomCode';
  }
}
