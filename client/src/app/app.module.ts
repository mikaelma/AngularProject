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
import { CreateDrinkComponent } from './drinks/create-drink/create-drink.component';
import {MyPageComponent} from "./my-page/my-page.component";
import {HeaderComponent} from "./header/header.component";
import {HeaderDialogBoxComponent} from "./header-dialog-box/header-dialog-box.component";
import {HeaderRegisterDialogBoxComponent} from "./header-register-dialog-box/header-register-dialog-box.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {DrinkListComponent} from "./drink-list/drink-list.component";
import {DrinkComponent} from "./drink/drink.component";
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule,
  MatToolbarModule, MatListModule, MatSnackBarModule, MatGridListModule
} from "@angular/material";
import {Angular2FontawesomeModule} from "angular2-fontawesome";
import {DrinkService} from './drink.service';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import {MainGuard} from "./main.guard";
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateDrinkComponent,
    MyPageComponent,
    HeaderComponent,
    HeaderDialogBoxComponent,
    HeaderRegisterDialogBoxComponent,
    MainPageComponent,
    DrinkListComponent,
    DrinkComponent,
    ChangePasswordDialogComponent,
    UnauthorizedComponent,
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
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatListModule
  ],
  providers: [JwtHelperService,AuthService, DrinkService, MainGuard],
  bootstrap: [AppComponent],
  entryComponents: [HeaderDialogBoxComponent, HeaderRegisterDialogBoxComponent, ChangePasswordDialogComponent]
})
export class AppModule { }
