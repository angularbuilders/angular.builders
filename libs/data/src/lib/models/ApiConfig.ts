import { InjectionToken } from '@angular/core';

export const API_CONFIG = new InjectionToken<ApiConfig>('');
export interface ApiConfig {
  url: string;
}
