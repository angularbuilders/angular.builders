import { RestService } from '@angular.builders/data';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../routes/models/User';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endPoint = 'users';
  constructor(private rest: RestService<User>) {}

  logIn$(user: User) {
    this.fakeFillUser(user);
    return this.rest.post$(this.endPoint, user);
  }

  getByEmailCredential$(userToken: Partial<User>) {
    const query = `email=${userToken.email}&atk=${userToken.atk}`;
    return this.rest
      .getByQuery$(this.endPoint, query)
      .pipe(map(this.fakeCheckCredential));
  }

  private fakeCheckCredential(result: User) {
    // ToDo: This will be done at server side
    if (Array.isArray(result) && result[0]['id']) {
      return result[0];
    } else {
      throw new Error('Not found credential!');
    }
  }

  private fakeFillUser(user: User) {
    // ToDo: This will be done at server side
    user.name = user.name ?? user.email;
    user.id = user.id ?? user.name.replace(' ', '');
    user.atk = 'secretRandomCode';
  }
}
