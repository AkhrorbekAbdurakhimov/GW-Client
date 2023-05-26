import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../auth/services/auth.service';

import { GwService } from './../services/gw.service';
import { SharedService } from './../services/shared.service';

import { User } from '../models/user.model';
import { Theme } from '../models/theme.model';

@Component({
  selector: 'app-my-gw',
  templateUrl: './my-gw.component.html',
  styleUrls: ['./my-gw.component.css']
})
export class MyGwComponent {
  isTeacher: boolean = false;
  isStudent: boolean = false;

  message: string = 'Delete Theme';

  user: User = {
    id: 0,
    username: '',
    role: '',
    avatar: '',
    full_name: '',
    created_at: new Date(),
  };
  themes: Theme[] = [];

  progressStatus: any = {
    'not-selected': ['next', 'not-done', 'not-done', 'not-done'],
    'initialized': ['done', 'next', 'not-done', 'not-done'],
    'pending': ['done', 'done', 'next', 'not-done'],
    'accepted': ['done', 'done', 'done', 'done'],
    'declined': ['done', 'done', 'done', 'done']
  }

  labels: string[] = ['not-selected', 'initialized', 'pending', 'accepted', 'declined'] 

  constructor(
    private router: Router,
    private gwService: GwService,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {

    if (this.user.role === 'teacher') {
      this.isTeacher = true; 
    } else if (this.user.role === 'student') {
      this.isStudent = true;
    }

    this.sharedService.getThemesById()
      
    this.sharedService
      .themes
      .subscribe(data => this.themes = data);
  }

  openAddThemeModal() {
    this.sharedService.changeAddThemeModalStatus(true);
  }

  deleteTheme(themeId: number) {
    this.sharedService.changeVerifyModal(true, this.message, themeId, 'deleteTheme');
  }

  pending(processId: number, status: string) {
    this.gwService.updateProcessStatus(processId, status).subscribe({
      next: data => {
        this.sharedService.getThemesById()
      }
    })
  }

  process() {
    this.router.navigateByUrl("/workspace")
  }
}
