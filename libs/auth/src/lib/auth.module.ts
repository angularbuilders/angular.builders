import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'login',
        loadChildren: () =>
          import('./routes/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'activate/:email/:atk',
        loadChildren: () =>
          import('./routes/activate/activate.module').then(
            (m) => m.ActivateModule
          ),
      },
    ]),
  ],
})
export class AuthModule {}
