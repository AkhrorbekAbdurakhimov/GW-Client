import { Component } from '@angular/core';
import { Theme } from '../models/theme.model';

import { SharedService } from '../services/shared.service';
import { AuthService } from '../auth/services/auth.service';

import { User } from '../models/user.model';
import { Status } from '../models/status.model';
import { GwService } from '../services/gw.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  themes: Theme[] = [];
  statuses: Status[] = [];
  message: string = 'Select this graduation work';

  isTeacher: boolean = false;
  isStudent: boolean = false;

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

    this.sharedService.getThemes(0);

    this.sharedService
      .themes
      .subscribe(data => this.themes = data);

    this.getStatuses()
  }

  selectGW(processId: number) {
    this.sharedService.changeVerifyModal(true, this.message, processId, 'Select')
  }

  getStatuses() {
    this.gwService.getStatusesList().subscribe({
      next: data => {
        this.statuses = data
      }
    })
  }

  filterThemes(target: EventTarget | null) {
    const selected = (target as HTMLSelectElement).value;
    this.sharedService.getThemes(Number(selected));
  }
} 
