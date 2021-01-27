import { DataModule } from '@angular.builders/data';
import { UiModule } from '@angular.builders/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EventSubFormComponent } from './event-sub-form/event-sub-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { CourseSubFormComponent } from './course-sub-form/course-sub-form.component';

@NgModule({
  declarations: [NewComponent, ItemFormComponent, EventSubFormComponent, CourseSubFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataModule,
    UiModule,
    NewRoutingModule,
  ],
})
export class NewModule {}
