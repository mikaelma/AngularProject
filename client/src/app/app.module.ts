import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import {JwtHelperService} from './jwthelper.service';
import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainGuard } from './main.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [JwtHelperService,AuthService, MainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
