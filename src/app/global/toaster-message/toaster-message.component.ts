import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-toaster-message',
  templateUrl: './toaster-message.component.html',
  styleUrls: ['./toaster-message.component.css']
})
export class ToasterMessageComponent {
  isWarning: boolean = false;
  toasterMessage: string = '';
  toasterMessageStatus: boolean = false;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService
      .isWarning
      .subscribe(status => this.isWarning = status)

    this.sharedService
      .toasterMessage
      .subscribe(message => this.toasterMessage = message)

    this.sharedService
      .toasterMessageStatus
      .subscribe(status => this.toasterMessageStatus = status)
  }
}
