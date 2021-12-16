import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err, caught: Observable<HttpEvent<any>>) => {
        if (err instanceof HttpErrorResponse && err.status == 401) {
          if (this.router.url != '/login' && this.router.url != '/registro') {
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['/'], {
              queryParams: { returnUrl: request.url },
            });
            return of(err as any);
          }
        }
        throw err;
      })
    );
    /* return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          window.location.href = '404';
          return throwError(error);
        }
        return throwError(error);
      })
    ); */
  }
}
