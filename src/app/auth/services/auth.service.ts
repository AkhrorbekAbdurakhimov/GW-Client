import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

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

  private setToken(res: any) {
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('token', res.token);
  }
}
