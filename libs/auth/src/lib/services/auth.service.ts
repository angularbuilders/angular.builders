import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../routes/models/User';
import { AuthStoreService } from './auth-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly loginUrl = '/auth/login';
  public readonly activateUrl = '/auth/activate';

  constructor(private router: Router, private authStore: AuthStoreService) {}

  isAuthenticated() {
    return this.authStore.getIsAuthenticatedSnapshot();
  }

  preRegisterUser(user: User) {
    this.authStore.saveUser(user, false);
    this.router.navigateByUrl(`${this.activateUrl}/${user.email}/${user.atk}`);
  }

  authenticateUser(user: User) {
    this.authStore.saveUser(user, true);
    this.router.navigateByUrl('/');
  }

  unauthenticateUser(user?: User) {
    this.authStore.saveNoCredentials();
    this.router.navigateByUrl(this.loginUrl);
  }
}
