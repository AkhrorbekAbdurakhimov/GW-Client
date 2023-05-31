import { Component } from '@angular/core';

import { faUserPlus, faUserTie, faCalendarDays, faUserPen, faUserMinus } from '@fortawesome/free-solid-svg-icons';

import { User } from '../models/user.model';

import { GwService } from '../services/gw.service';

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

  users: User[] = [];

  constructor(
    private gwService: GwService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.gwService.getUsers(0).subscribe({
      next: data => {
        this.users = data;
      }
    })
  }
}
