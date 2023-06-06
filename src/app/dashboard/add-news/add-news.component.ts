import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { GwService } from 'src/app/services/gw.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent {
  addNewsModalStatus: boolean = false;

  addNewsForm = this.fb.group({
    body: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private gwService: GwService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService
      .addNewsModalStatus
      .subscribe(status => this.addNewsModalStatus = status);
  }

  closeAddNewsModal() {
    this.sharedService.changeAddNewsModalStatus(false);
  }

  addNews() {
    if (this.addNewsForm.valid) {
      const { body } = this.addNewsForm.value;
      this.gwService.addNews(String(body)).subscribe({
        next: data => {
          this.sharedService.changeToasterMessageStatus(true);
          this.sharedService.changeToasterMessage(data.message);
          this.sharedService.changeAddNewsModalStatus(false);
          this.sharedService.getNews();
          setTimeout(() => {
            this.sharedService.changeToasterMessageStatus(false);
          }, 1500)
        }
      })
    }
    this.addNewsForm.reset()
  }
}
