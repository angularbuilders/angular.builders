import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './activate.component';


const routes: Routes = [
  { path: '', component: ActivateComponent }
];

@NgModule({
  declarations: [ActivateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivateModule { }
