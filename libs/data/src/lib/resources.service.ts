import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, Resource } from '..';
import { ApiConfig } from './models/ApiConfig';
@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private readonly endPoint = 'resources';
  private apiUrl = '';

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private apiConfig: ApiConfig
  ) {
    this.apiUrl = this.apiConfig.url + this.endPoint;
  }

  getFeatured$() {
    return this.http.get<Resource[]>(this.apiUrl);
  }
}
