import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { AuthService } from '../auth/services/auth.service';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GwService {

  user: User = {
    id: 0,
    username: '',
    role: '',
    avatar: '',
    full_name: '',
    created_at: new Date(),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.user = this.authService.getUser();
  }

  getThemesById() {
    return this.http
      .get<any>(`${environment.apiUrl}/themes/list?${this.user.role}Id=${this.user.id}`);
  }

  addTheme(title: string, description: string, advisorId: number | null) {
    const payload: { title: string, description: string, advisorId?: number } = { title, description };
    if (advisorId) {
      payload.advisorId = advisorId
    }
    return this.http
      .post<any>(`${environment.apiUrl}/themes/create`, payload)
  }

  deleteTheme(themeId: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}/themes/${themeId}`);
  }
}
