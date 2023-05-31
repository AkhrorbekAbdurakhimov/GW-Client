import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room/room.component';
import { MyGwComponent } from './my-gw/my-gw.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const routes: Routes = [
  { path: 'room', component: RoomComponent },
  { path: 'my-gw', component: MyGwComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
