import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../routes/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly loginUrl = '/auth/login';
  public readonly activateUrl = '/auth/activate';
  private authToken: string | null | undefined;
  private readonly authKey = 'authToken';

  constructor(private router: Router) {
    this.authToken = localStorage.getItem(this.authKey);
  }

  isAuthenticated() {
    const isAuthenticated = !!this.authToken;
    return isAuthenticated;
  }

  preRegisterUser(user: User) {
    this.router.navigateByUrl(`${this.activateUrl}/${user.email}/${user.atk}`);
  }

  authenticateUser(user: User) {
    this.authToken = user.atk;
    localStorage.setItem(this.authKey, this.authToken as string);
    this.router.navigateByUrl('/');
  }

  unauthenticateUser(user?: User) {
    this.authToken = null;
    this.router.navigateByUrl(this.loginUrl);
  }
}
