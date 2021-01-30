import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiConfig, API_CONFIG } from './models/ApiConfig';

type idName = {
  id: string;
  name: string;
};
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

  getByQuery$(endpoint: string, query: string) {
    return this.http.get<T[]>(this.makeUrl(endpoint, '', query));
  }

  getCountByQuery$(endpoint: string, query: string) {
    return this.http
      .get<unknown>(this.makeUrl(endpoint, '', query + '&_page=1&_limit=0'), {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.headers.get('x-total-count');
        })
      );
  }

  post$(endpoint: string, payload: T) {
    this.ensureId((payload as unknown) as idName);
    return this.http.post<T>(this.makeUrl(endpoint), payload);
  }

  private ensureId(payload: idName) {
    if (!payload) return;
    if (!payload['id']) {
      payload['id'] = this.slugify(payload['name']);
    }
  }

  private makeUrl(endPoint: string, id?: string, query?: string) {
    let endPointUrl = this.apiConfig.url + endPoint;
    if (id) {
      endPointUrl += '/' + id;
    }
    if (query) {
      endPointUrl += '?' + query;
    }
    return endPointUrl;
  }

  private slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
      .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single _
      .replace(/^-+|-+$/g, ''); // remove leading, trailing -
  }
}
