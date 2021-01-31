import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStoreService } from './auth-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authStore.getTokenSnapshot();
    const authorization = 'Bearer ' + token;
    request = request.clone({
      setHeaders: {
        Authorization: authorization,
      },
    });
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        if ([401, 403].includes(err.status)) {
          this.authStore.saveNoCredentials();
        }
        return throwError(err);
      })
    );
  }
}
