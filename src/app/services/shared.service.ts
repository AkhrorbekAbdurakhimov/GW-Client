import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { News } from '../models/news';
import { User } from '../models/user.model';
import { Theme } from '../models/theme.model';
import { Verify } from '../models/verify.model';

import { GwService } from './gw.service';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private addNewsModalStatusSource = new BehaviorSubject<boolean>(false);
  private addThemeModalStatusSource = new BehaviorSubject<boolean>(false);
  private userInfoModalStatusSource = new BehaviorSubject<User>({
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
    hasTheme: false,
    joinedAt: new Date(),
  });
  private addUserModalStatusSource = new BehaviorSubject<boolean>(false);
  private verifyModalSource = new BehaviorSubject<Verify>({ 
    status: false, 
    message: '', 
    id: 0, 
    type: '' 
  });
  private uThemesSource = new BehaviorSubject<Theme[]>([])
  private themesSource = new BehaviorSubject<Theme[]>([])
  private usersSource = new BehaviorSubject<User[]>([])
  private userSource = new BehaviorSubject<User>({
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
    hasTheme: false,
    joinedAt: new Date(),
  })
  private newsSource = new BehaviorSubject<News[]>([])

  // toaster message
  private toasterMessageStatusSource = new BehaviorSubject<boolean>(false);
  private toasterMessageSource = new BehaviorSubject<string>('');
  private isWarningSource = new BehaviorSubject<boolean>(false);

  addNewsModalStatus = this.addNewsModalStatusSource.asObservable();
  addThemeModalStatus = this.addThemeModalStatusSource.asObservable();
  addUserModalStatus = this.addUserModalStatusSource.asObservable();
  userInfoModalStatus = this.userInfoModalStatusSource.asObservable();
  verifyModal = this.verifyModalSource.asObservable();
  uthemes = this.uThemesSource.asObservable();
  themes = this.themesSource.asObservable();
  users = this.usersSource.asObservable();
  user = this.userSource.asObservable();
  news = this.newsSource.asObservable();

  // toaster message
  toasterMessageStatus = this.toasterMessageStatusSource.asObservable();
  toasterMessage = this.toasterMessageSource.asObservable();
  isWarning = this.isWarningSource.asObservable();

  constructor(
    public gwService: GwService,
    public authService: AuthService
  ) { 
    this.userSource.next(this.authService.getUser())
  }

  changeAddThemeModalStatus(status: boolean) {
    this.addThemeModalStatusSource.next(status);
  }

  changeAddNewsModalStatus(status: boolean) {
    this.addNewsModalStatusSource.next(status);
  }

  changeAddUserModalStatus(status: boolean) {
    this.addUserModalStatusSource.next(status);
  }

  changeVerifyModal(status: boolean, message: string, id: number, type: string) {
    this.verifyModalSource.next({status, message, id, type})
  }

  changeUserInfoModal(info: User) {
    this.userInfoModalStatusSource.next(info)
  }

  changeUser(user: User) {
    this.userSource.next(user)
  }

  changeToasterMessageStatus(status: boolean) {
    this.toasterMessageStatusSource.next(status)
  }

  changeToasterMessage(message: string) {
    this.toasterMessageSource.next(message)
  }

  changeIsWarning(status: boolean) {
    this.isWarningSource.next(status)
  }

  getThemesById(user: User) {
    this.gwService.getThemesById(user).subscribe({
      next: (data) => {
        this.uThemesSource.next(data)
      }
    })
  }

  getThemes(statusId: number) {
    this.gwService.getThemes(statusId).subscribe({
      next: (data) => {
        this.themesSource.next(data)
      }
    })
  }

  getUsers() {
    this.gwService.getUsers(0).subscribe({
      next: data => {
        this.usersSource.next(data);
      }
    })
  }

  getNews () {
    this.gwService.getNews().subscribe({
      next: data => {
        this.newsSource.next(data);
      }
    })
  }
}
