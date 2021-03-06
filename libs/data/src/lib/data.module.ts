import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiConfig, API_CONFIG } from './models/ApiConfig';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {
  public static forRoot(apiConfig: ApiConfig): ModuleWithProviders<DataModule> {
    return {
      ngModule: DataModule,
      providers: [
        {
          provide: API_CONFIG,
          useValue: apiConfig,
        },
      ],
    };
  }
}
