import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiConfig, API_CONFIG } from './models/ApiConfig';

@Injectable({
  providedIn: 'root',
})
export class RestService<T> {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private apiConfig: ApiConfig
  ) {}

  getAll$(endpoint: string) {
    return this.http.get<T[]>(this.makeUrl(endpoint));
  }

  getById$(endpoint: string, id: string) {
    return this.http.get<T>(this.makeUrl(endpoint, id));
  }

  private makeUrl(endPoint: string, id?: string) {
    let endPointUrl = this.apiConfig.url + endPoint;
    if (id) {
      endPointUrl += '/' + id;
    }
    return endPointUrl;
  }
}
