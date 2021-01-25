import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRoutingModule } from './show-routing.module';
import { ShowComponent } from './show.component';


@NgModule({
  declarations: [ShowComponent],
  imports: [
    CommonModule,
    ShowRoutingModule
  ]
})
export class ShowModule { }
