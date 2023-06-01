import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SettingsComponent } from './settings.component';

import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
