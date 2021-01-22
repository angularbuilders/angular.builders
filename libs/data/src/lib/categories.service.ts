import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ApiConfig } from './models/ApiConfig';
import { Category } from './models/Category';

export const API_CONFIG = new InjectionToken<ApiConfig>('');

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly endPoint = 'categories';
  private apiUrl = '';

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private apiConfig: ApiConfig
  ) {
    this.apiUrl = this.apiConfig.url + this.endPoint;
  }

  getAll$() {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
