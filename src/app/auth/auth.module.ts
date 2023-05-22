import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
