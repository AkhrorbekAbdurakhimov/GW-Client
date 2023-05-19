import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../../environments/environment';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login (login: any, password: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/admin/login`, {
        login, 
        password
      })
      .pipe(tap((res) => this.setToken(res)))
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  isTokenExpired(): boolean {
    return new JwtHelperService().isTokenExpired(this.getToken());
  }

  private setToken(res: any) {
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('token', res.token);
  }
}
