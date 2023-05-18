import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router, 
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
    });

    return next.handle(clonedRequest).pipe(
      tap(
        () => {},
        (error) => {
          if (error.status === 401 && this.authService.isTokenExpired()) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      )
    );
  }
}
