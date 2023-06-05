import { Component } from '@angular/core';

import { User } from 'src/app/models/user.model';

import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
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
      .userInfoModalStatus
      .subscribe(info => this.user = info)
  }

  closeUserInfoModal() {
    this.sharedService.changeUserInfoModal({
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
    })
  }
}
