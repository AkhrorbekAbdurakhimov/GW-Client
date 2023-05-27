import { Component } from '@angular/core';
import { Theme } from '../models/theme.model';

import { SharedService } from '../services/shared.service';
import { AuthService } from '../auth/services/auth.service';

import { User } from '../models/user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  themes: Theme[] = [];
  message: string = 'Select this graduation work';

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

  constructor(
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

    this.sharedService.getThemes()

    this.sharedService
      .themes
      .subscribe(data => this.themes = data);
  }

  selectGW(processId: number) {
    this.sharedService.changeVerifyModal(true, this.message, processId, 'Select')
  }
} 
