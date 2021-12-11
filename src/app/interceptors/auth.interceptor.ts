import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(request);
    }

    const headers = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    console.log(headers);
    console.log(request);
    return next.handle(headers);
  }
}
