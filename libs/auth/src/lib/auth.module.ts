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
      { path: 'activate:code', loadChildren: () => import('./routes/activate/activate.module').then(m => m.ActivateModule) },
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class AuthModule {}
