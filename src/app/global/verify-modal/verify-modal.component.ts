import { Component, Output, EventEmitter } from '@angular/core';

import { Verify } from 'src/app/models/verify.model';

import { GwService } from 'src/app/services/gw.service';
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

  constructor(
    private gwService: GwService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService
      .verifyModal
      .subscribe(details => this.details = details);
  }

  closeVerifyModal() {
    this.sharedService.changeVerifyModal(false, '', 0, '');
  }

  verify() {
    if (this.details.type === 'deleteTheme') {
      this.gwService.deleteTheme(this.details.id).subscribe({
        next: data => {
          this.sharedService.changeVerifyModal(false, '', 0, '');
          this.sharedService.changeToasterMessageStatus(true);
          this.sharedService.changeToasterMessage(data.message);
          this.sharedService.changeAddThemeModalStatus(false);
          this.sharedService.getThemesById();
          setTimeout(() => {
            this.sharedService.changeToasterMessageStatus(false);
          }, 1500)
        }
      })
    }
  }
}
