import { Component } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { Verify } from 'src/app/models/verify.model';

import { GwService } from 'src/app/services/gw.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.css']
})
export class VerifyModalComponent {

  details: Verify = {
    status: false,
    message: '',
    type: '',
    id: 0,
  };

  user: User = {
    id: 0,
    username: '',
    role: '',
    avatar: '',
    full_name: '',
    capacity: 0,
    created_at: new Date(),
  }; 

  constructor(
    private gwService: GwService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.sharedService
      .verifyModal
      .subscribe(details => this.details = details);
  }

  closeVerifyModal() {
    this.sharedService.changeVerifyModal(false, '', 0, '');
  }

  verify() {
    console.log(this.details);
    if (this.details.type === 'Delete') {
      this.gwService.deleteTheme(this.details.id).subscribe({
        next: data => {
          this.sharedService.changeVerifyModal(false, '', 0, '');
          this.sharedService.changeToasterMessageStatus(true);
          this.sharedService.changeToasterMessage(data.message);
          this.sharedService.changeAddThemeModalStatus(false);
          this.sharedService.getThemesById(this.user);
          setTimeout(() => {
            this.sharedService.changeToasterMessageStatus(false);
          }, 1500)
        }
      })
    }
    if (this.details.type === 'Select') {
      this.gwService.bindStudentToGw(this.details.id).subscribe({
        next: data => {
          this.sharedService.changeVerifyModal(false, '', 0, '');
          this.sharedService.changeToasterMessageStatus(true);
          this.sharedService.changeToasterMessage(data.message);
          this.sharedService.getThemes(0);
          setTimeout(() => {
            this.sharedService.changeToasterMessageStatus(false);
          }, 1500)
        }
      })
    }
  }
}
