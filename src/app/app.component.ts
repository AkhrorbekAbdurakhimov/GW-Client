import { Component  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from './auth/services/auth.service';

import { User } from './models/user.model';
import { Theme } from './models/theme.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'GW-SHARE';
  currentRoute: string = '';

  isProfileModal = false;

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

  themes: Theme[] = [];
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  closeProfileModal() {
    console.log('hi');
    this.isProfileModal = false;
  }

  openProfileModal() {
    this.isProfileModal = true;
  }

  showSidebarAndHeader(): boolean {
    return this.currentRoute !== '/not-found' && this.currentRoute !== '/login';
  }
}
