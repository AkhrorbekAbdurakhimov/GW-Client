import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MyGwComponent } from './my-gw.component';
import { AddThemeComponent } from './add-theme/add-theme.component';


@NgModule({
  declarations: [
    MyGwComponent,
    AddThemeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class MyGwModule { }
