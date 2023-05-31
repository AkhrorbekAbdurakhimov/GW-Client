import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { GwService } from '../../services/gw.service';
import { SharedService } from '../../services/shared.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent {

  addThemeModalStatus: boolean = false;
  addThemeForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

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
    private fb: FormBuilder,
    private gwService: GwService,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {
    this.user = this.authService.getUser();
  }

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
          this.sharedService.getThemesById(this.user);
          setTimeout(() => {
            this.sharedService.changeToasterMessageStatus(false);
          }, 1500)
        }
      })
      
    }

    this.addThemeForm.reset();
  }
}
