import { Component, Output, EventEmitter } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { GwService } from '../../services/gw.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent {

  @Output() getThemes: EventEmitter<any> = new EventEmitter();

  addThemeModalStatus: boolean = false;
  addThemeForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private gwService: GwService,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.sharedService
      .addThemeModalStatus
      .subscribe(status => this.addThemeModalStatus = status);
  }

  closeAddThemeModal() {
    this.sharedService.changeAddThemeModalStatus(false);
  }

  addTheme() {
    if (this.addThemeForm.valid) {
      const { title, description } = this.addThemeForm.value;

      this.gwService.addTheme(String(title), String(description), null).subscribe({
        next: data => {
          this.sharedService.changeToasterMessageStatus(true);
          this.sharedService.changeToasterMessage(data.message);
          this.sharedService.changeAddThemeModalStatus(false);
          this.getThemes.emit();
          setTimeout(() => {
            this.sharedService.changeToasterMessageStatus(false);
          }, 1500)
        }
      })
      
    }
  }
}
