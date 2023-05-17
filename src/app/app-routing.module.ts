import { NgModule } from '@angular/core';
import { RouterModule, RouterLinkActive, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyGwComponent } from './my-gw/my-gw.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'my-gw', component: MyGwComponent },
  { path: 'room', component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterLinkActive]
})
export class AppRoutingModule { }
