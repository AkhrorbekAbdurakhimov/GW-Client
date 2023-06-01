import { Component } from '@angular/core';

import { faUserPlus, faUserTie, faCalendarDays, faUserPen, faUserMinus } from '@fortawesome/free-solid-svg-icons';

import { User } from '../models/user.model';

import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  addIcon = faUserPlus;
  avatarIcon = faUserTie;
  userEditIcon = faUserPen;
  userDeleteIcon = faUserMinus;
  joinedDateIcon = faCalendarDays;

  defaultURL = './../../assets/avatar.png';

  message: string = 'Delete User';

  users: User[] = [];

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {

    this.sharedService.getUsers()

    this.sharedService
      .users
      .subscribe(data => this.users = data);
  }

  openAddUserModal() {
    this.sharedService.changeAddUserModalStatus(true);
  }

  deleteUser(userId: number) {
    this.sharedService.changeVerifyModal(true, this.message, userId, 'Delete User');
  }
}
