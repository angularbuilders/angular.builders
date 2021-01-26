import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([{ path: 'login', loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule) }
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class AuthModule {}
