import { Component  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { SharedService } from './services/shared.service';

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
    hasTheme: false,
    joinedAt: new Date(),
  };

  themes: Theme[] = [];
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    this.sharedService
      .user
      .subscribe(user => this.user = user);

  }

  showSidebarAndHeader(): boolean {
    return this.currentRoute !== '/not-found' && this.currentRoute !== '/login';
  }

  logout() {
    this.authService.logout();
    this.isProfileModal = false;
  }
}
