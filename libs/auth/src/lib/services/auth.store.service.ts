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
    let initialAuthState: Auth = { user: null, isAuthenticated: false };
    const savedState = localStorage.getItem('auth');
    if (savedState) {
      const parsedState = JSON.parse(savedState) as Auth;
      if (parsedState) {
        initialAuthState = parsedState;
      }
    }
    super(initialAuthState);
  }

  saveUser(user: User, isAuthenticated: boolean) {
    const saveUserAction = (state: Auth) => {
      state.user = user;
      state.isAuthenticated = isAuthenticated;
      return state;
    };
    this.dispatch(saveUserAction);
    localStorage.setItem('auth', JSON.stringify(this.state));
  }

  saveNoCredentials() {
    const saveEmptyCredentials = (state: Auth) => {
      state.user = null;
      state.isAuthenticated = false;
      return state;
    };
    localStorage.removeItem('auth');
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
    return this.state?.user?.stk || '';
  }
}
