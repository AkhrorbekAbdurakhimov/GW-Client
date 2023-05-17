import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  isLoggedIn: boolean = false;
  message: string = '';
  loginForm = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor (
    private router: Router,
    private fb: FormBuilder, 
    private authService: AuthService
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.authService.login(login, password).subscribe({
        next: data => {
          this.isLoggedIn = true;
          this.message = data.message;
          setTimeout(() => {
            this.router.navigateByUrl('/')
          }, 500)
        },
        error: error => {
          this.message = error.error.message
        }
      })
    }
  }
}
