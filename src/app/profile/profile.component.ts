import { Component } from '@angular/core';

import { User } from '../models/user.model';

import { AuthService } from '../auth/services/auth.service';

import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  linkedinIcon = faLinkedin;

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
    private authService: AuthService
  ) { 
    this.user = this.authService.getUser();
  }
}
