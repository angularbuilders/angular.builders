import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ActivateComponent } from './activate.component';

const routes: Routes = [{ path: '', component: ActivateComponent }];

@NgModule({
  declarations: [ActivateComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ActivateModule {}
