import { AuthModule } from '@angular.builders/auth';
import { DataModule } from '@angular.builders/data';
import { UiModule } from '@angular.builders/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { CoreRoutingModule } from './core-routing.module';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    UiModule,
    AuthModule,
    DataModule.forRoot(environment.apiConfig),
  ],
  exports: [ShellComponent],
})
export class CoreModule {}
