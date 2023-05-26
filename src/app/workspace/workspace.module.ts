import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { WorkspaceComponent } from './workspace.component';

@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class WorkspaceModule { }
