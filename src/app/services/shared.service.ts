import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Theme } from '../models/theme.model';
import { Verify } from '../models/verify.model';

import { GwService } from './gw.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

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

  // toaster message
  private toasterMessageStatusSource = new BehaviorSubject<boolean>(false);
  private toasterMessageSource = new BehaviorSubject<string>('');
  private isWarningSource = new BehaviorSubject<boolean>(false);

  addThemeModalStatus = this.addThemeModalStatusSource.asObservable();
  addUserModalStatus = this.addUserModalStatusSource.asObservable();
  userInfoModalStatus = this.userInfoModalStatusSource.asObservable();
  verifyModal = this.verifyModalSource.asObservable();
  uthemes = this.uThemesSource.asObservable();
  themes = this.themesSource.asObservable();
  users = this.usersSource.asObservable();

  // toaster message
  toasterMessageStatus = this.toasterMessageStatusSource.asObservable();
  toasterMessage = this.toasterMessageSource.asObservable();
  isWarning = this.isWarningSource.asObservable();

  constructor(
    public gwService: GwService
  ) { }

  changeAddThemeModalStatus(status: boolean) {
    this.addThemeModalStatusSource.next(status);
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
}
