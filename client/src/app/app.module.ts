import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {JwtHelperService} from './jwthelper.service';
import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainGuard } from './main.guard';
import { MyPageComponent } from './my-page/my-page.component';
import { HeaderComponent } from './header/header.component';
import { HeaderDialogBoxComponent } from './header-dialog-box/header-dialog-box.component';
import {MatToolbarModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { HeaderRegisterDialogBoxComponent } from './header-register-dialog-box/header-register-dialog-box.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyPageComponent,
    HeaderComponent,
    HeaderDialogBoxComponent,
    HeaderRegisterDialogBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    Angular2FontawesomeModule,
    MatFormFieldModule,
    MatInputModule
  ],

  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [HeaderDialogBoxComponent, HeaderRegisterDialogBoxComponent]


})
export class AppModule { }
