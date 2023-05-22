import { Component } from '@angular/core';

import { AuthService } from '../auth/services/auth.service';

import { GwService } from './../services/gw.service';
import { SharedService } from './../services/shared.service';

import { User } from '../models/user.model';
import { Theme } from '../models/theme.modal';

@Component({
  selector: 'app-my-gw',
  templateUrl: './my-gw.component.html',
  styleUrls: ['./my-gw.component.css']
})
export class MyGwComponent {
  isTeacher: boolean = false;
  isStudent: boolean = false;

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
    'not-selected': ['done', 'next', 'not-done', 'not-done'],
    'initialized': ['done', 'done', 'next', 'not-done'],
    'pending': ['done', 'done', 'done', 'next'],
    'accepted': ['done', 'done', 'done', 'done']
  }

  labels: string[] = ['not-selected', 'initialized', 'pending', 'accepted'] 

  constructor(
    private authService: AuthService,
    private gwService: GwService,
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
      
    this.getThemes();

  }

  getThemes() {
    return this.gwService.getThemesById().subscribe({
      next: (data) => {
        this.themes = data;
      }
    })
  }

  openAddThemeModal() {
    this.sharedService.changeAddThemeModalStatus(true);
  }
}
