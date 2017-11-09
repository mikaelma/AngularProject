import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateDrinkComponent } from './drinks/create-drink/create-drink.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateDrinkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
