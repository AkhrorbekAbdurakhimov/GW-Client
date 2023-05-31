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
  private verifyModalSource = new BehaviorSubject<Verify>({ status: false, message: '', id: 0, type: '' });
  private uThemesSource = new BehaviorSubject<Theme[]>([])
  private themesSource = new BehaviorSubject<Theme[]>([])

  // toaster message
  private toasterMessageStatusSource = new BehaviorSubject<boolean>(false);
  private toasterMessageSource = new BehaviorSubject<string>('');
  private isWarningSource = new BehaviorSubject<boolean>(false);

  addThemeModalStatus = this.addThemeModalStatusSource.asObservable();
  verifyModal = this.verifyModalSource.asObservable();
  uthemes = this.uThemesSource.asObservable();
  themes = this.themesSource.asObservable();

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

  changeVerifyModal(status: boolean, message: string, id: number, type: string) {
    this.verifyModalSource.next({status, message, id, type})
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
}
