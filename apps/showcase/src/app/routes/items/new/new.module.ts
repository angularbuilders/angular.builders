import { DataModule } from '@angular.builders/data';
import { UiModule } from '@angular.builders/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { ItemFormComponent } from './item-form/item-form.component';

@NgModule({
  declarations: [NewComponent, ItemFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataModule,
    UiModule,
    NewRoutingModule,
  ],
})
export class NewModule {}
