import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateDrinkComponent } from './drinks/create-drink/create-drink.component';
import {MyPageComponent} from "./my-page/my-page.component";
import {HeaderComponent} from "./header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule} from "@angular/material";
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateDrinkComponent,
    MyPageComponent,
    HeaderComponent
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
