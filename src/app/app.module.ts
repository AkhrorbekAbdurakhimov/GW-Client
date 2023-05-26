import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { MyGwModule } from './my-gw/my-gw.module';
import { MainPageModule } from './main-page/main-page.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WorkspaceModule } from './workspace/workspace.module';

import { AuthInterceptor } from './auth/auth.interceptor';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerifyModalComponent } from './global/verify-modal/verify-modal.component';
import { ToasterMessageComponent } from './global/toaster-message/toaster-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    VerifyModalComponent,
    ToasterMessageComponent,
  ],
  imports: [
    MyGwModule,
    RoomModule,
    AuthModule,
    BrowserModule,
    MatIconModule,
    MainPageModule,
    DashboardModule,
    WorkspaceModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true 
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
