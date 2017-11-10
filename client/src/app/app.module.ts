import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MyPageComponent } from './my-page/my-page.component';
import { HeaderComponent } from './header/header.component';
import { HeaderDialogBoxComponent } from './header-dialog-box/header-dialog-box.component';
import {MatToolbarModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule} from '@angular/material';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyPageComponent,
    HeaderComponent,
    HeaderDialogBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    Angular2FontawesomeModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HeaderDialogBoxComponent]

})
export class AppModule { }
