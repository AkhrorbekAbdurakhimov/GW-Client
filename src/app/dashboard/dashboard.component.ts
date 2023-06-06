import { Component } from '@angular/core';

import { News } from '../models/news';
import { User } from '../models/user.model';

import { GwService } from '../services/gw.service';
import { AuthService } from '../auth/services/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  news: News[] = [];

  isAdmin: boolean = false;

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


  constructor (
    private gwService: GwService,
    private authService: AuthService,
    private sharedService: SharedService
  ) { 
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    if (this.user.role === 'admin') {
      this.isAdmin = true; 
    } 

    this.sharedService.getNews()
      
    this.sharedService
      .news
      .subscribe(data => this.news = data);
  }

  openAddNewsModal() {
    this.sharedService.changeAddNewsModalStatus(true);
  }
}
