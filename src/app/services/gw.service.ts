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
    fullName: '',
    faculty: '',
    capacity: 0,
    gpa: 0,
    position: '',
    skills: [],
    linkedin: '',
    joinedAt: new Date(),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.user = this.authService.getUser();
  }

  getUser (userId: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/user/${userId}`)
  }

  getUsers (roleId: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/users/${roleId}`)
  }

  getThemes (statusId: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/themes/list${statusId ? `?statusId=${statusId}` : ''}`)
  }

  getStatusesList () {
    return this.http
      .get<any>(`${environment.apiUrl}/themes/status/list`)
  }

  getSkillsList () {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/skills`)
  }

  getThemesById (user: User) {
    return this.http
      .get<any>(`${environment.apiUrl}/themes/list?${user.role}Id=${user.id}`);
  }

  addTheme (title: string, description: string, advisorId: number | null) {
    const payload: { title: string, description: string, advisorId?: number } = { title, description };
    if (advisorId) {
      payload.advisorId = advisorId
    }
    return this.http
      .post<any>(`${environment.apiUrl}/themes/`, payload)
  }

  deleteUser (userId: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}/admin/user/${userId}`);
  }

  addUser (
    username: string, 
    password: string, 
    fullName: string, 
    position: string | null, 
    avatar: string | null, 
    role: string,
    gpa: number | null, 
    faculty: string | null, 
    skills: any, 
    capacity: number | null, 
    linkedin: string | null
  ) {
    return this.http
      .post<any>(`${environment.apiUrl}/admin/register`, {
        username,
        password,
        fullName,
        position,
        avatar,
        role, 
        gpa,
        faculty,
        skills,
        capacity,
        linkedin
      })
  }

  deleteTheme (themeId: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}/themes/${themeId}`);
  }

  updateProcessStatus (processId: number, status: string) {
    return this.http
      .patch<any>(`${environment.apiUrl}/themes/status/${processId}`, {
        status
      });
  }

  bindStudentToGw (processId: number) {
    return this.http
      .post<any>(`${environment.apiUrl}/themes/bind`, {
        processId
      });
  }
}
