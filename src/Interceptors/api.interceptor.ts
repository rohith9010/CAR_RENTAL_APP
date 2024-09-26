import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
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

    return next.handle(request);
  }
}
