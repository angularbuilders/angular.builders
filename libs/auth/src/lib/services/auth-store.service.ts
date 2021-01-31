import { FunctionalStoreService } from '@angular.builders/data';
import { Injectable } from '@angular/core';
import { User } from '../routes/models/User';

type Auth = {
  user: User | null;
  isAuthenticated: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService extends FunctionalStoreService<Auth> {
  constructor() {
    super({ user: null, isAuthenticated: false });
  }

  saveUser(user: User, isAuthenticated: boolean) {
    const saveUserAction = (state: Auth) => {
      state.user = user;
      state.isAuthenticated = isAuthenticated;
      return state;
    };
    this.dispatch(saveUserAction);
  }

  saveNoCredentials() {
    const saveEmptyCredentials = (state: Auth) => {
      state.user = null;
      state.isAuthenticated = false;
      return state;
    };
    this.dispatch(saveEmptyCredentials);
  }

  selectIsAuthenticated$() {
    const selection = (state: Auth) => state.isAuthenticated;
    return this.select$(selection);
  }
  selectUser$() {
    const selection = (state: Auth) => state.user;
    return this.select$(selection);
  }
  getIsAuthenticatedSnapshot() {
    return this.state.isAuthenticated;
  }
  getTokenSnapshot() {
    if (this.state?.isAuthenticated) {
      if (this.state.user) {
        return this.state.user.stk || '';
      }
    }
    return '';
  }
}
