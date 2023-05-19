import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MyGwComponent } from './my-gw.component';



@NgModule({
  declarations: [
    MyGwComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class MyGwModule { }
