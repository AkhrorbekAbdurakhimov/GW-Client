import { Component } from '@angular/core';

import { User } from '../models/user.model';

import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { SharedService } from '../services/shared.service';

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
    hasTheme: false,
    joinedAt: new Date(),
  };

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService
      .user
      .subscribe(user => this.user = user);
  }
}
