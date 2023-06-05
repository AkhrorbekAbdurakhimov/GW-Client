import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkspaceComponent } from './workspace.component';

@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class WorkspaceModule { }
