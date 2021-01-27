import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
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
