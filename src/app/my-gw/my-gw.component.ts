import { Component } from '@angular/core';

import { MyGwService } from './services/my-gw.service';
import { AuthService } from '../auth/services/auth.service';

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
    private myGwService: MyGwService,
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {

    if (this.user.role === 'teacher') {
      this.isTeacher = true; 
    } else if (this.user.role === 'student') {
      this.isStudent = true;
    }
      
    this.getThemes(this.user.id, this.user.role);

  }

  getThemes(id: number, role: string) {
    return this.myGwService.getThemesById(id, role).subscribe({
      next: (data) => {
        this.themes = data;
      }
    })
  }

}
