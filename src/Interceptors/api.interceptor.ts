import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthGuardService } from '../Services/AuthService/AuthGuard.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthGuardService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authservice.gettoken();

    if (token) {
          const clonedReq = request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
          })
        }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Attempt to refresh the token
          return this.authservice.refreshToken().pipe(
            switchMap((res) => {
              // Clone the original request with the new token
              const newToken = res.Token; // Adjust this according to your response
              if (newToken) {
                this.authservice.storetoken(newToken);
                const clonedReq = request.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` }
                });
                return next.handle(clonedReq);
              }
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
