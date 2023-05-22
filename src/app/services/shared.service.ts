import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private addThemeModalStatusSource = new BehaviorSubject<boolean>(false);

  // toaster message
  private toasterMessageStatusSource = new BehaviorSubject<boolean>(false);
  private toasterMessageSource = new BehaviorSubject<string>('');
  private isWarningSource = new BehaviorSubject<boolean>(false);

  addThemeModalStatus = this.addThemeModalStatusSource.asObservable();

  // toaster message
  toasterMessageStatus = this.toasterMessageStatusSource.asObservable();
  toasterMessage = this.toasterMessageSource.asObservable();
  isWarning = this.isWarningSource.asObservable();

  constructor() { }

  changeAddThemeModalStatus(status: boolean) {
    this.addThemeModalStatusSource.next(status);
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
}
