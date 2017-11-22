import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {JwtHelperService} from './jwthelper.service';
import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { CreateDrinkComponent } from './create-drink/create-drink.component';
import {MyPageComponent} from "./my-page/my-page.component";
import {HeaderComponent} from "./header/header.component";
import {HeaderDialogBoxComponent} from "./login-dialog-box/login-dialog-box.component";
import {HeaderRegisterDialogBoxComponent} from "./register-dialog-box/register-dialog-box.component";
import {DrinkListComponent} from "./drink-list/drink-list.component";
import {DrinkComponent} from "./drink/drink.component";
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule,
  MatToolbarModule, MatListModule, MatGridListModule, MatButtonToggleModule, MatSnackBarModule
} from "@angular/material";
import {Angular2FontawesomeModule} from "angular2-fontawesome";
import {DrinkService} from './drink.service';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import {MainGuard} from "./main.guard";
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MyPageDrinkListComponent } from './my-page-drink-list/my-page-drink-list.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

@NgModule({
  declarations: [
    AppComponent,
    CreateDrinkComponent,
    MyPageComponent,
    HeaderComponent,
    HeaderDialogBoxComponent,
    HeaderRegisterDialogBoxComponent,
    DrinkListComponent,
    DrinkComponent,
    ChangePasswordDialogComponent,
    UnauthorizedComponent,
    MyPageDrinkListComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    Angular2FontawesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    InfiniteScrollModule,
    Ng2CarouselamosModule,
    MatSnackBarModule
  ],
  providers: [JwtHelperService,AuthService, DrinkService, MainGuard],
  bootstrap: [AppComponent],
  entryComponents: [HeaderDialogBoxComponent, HeaderRegisterDialogBoxComponent, ChangePasswordDialogComponent]
})
export class AppModule { }
