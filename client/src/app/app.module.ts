import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JwtHelperService } from './jwthelper.service';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainGuard } from './main.guard';
import { MyPageComponent } from './my-page/my-page.component';
import { HeaderComponent } from './header/header.component';
import { HeaderDialogBoxComponent } from './header-dialog-box/header-dialog-box.component';
import { MatToolbarModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatTableModule} from '@angular/material';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MainPageComponent } from './main-page/main-page.component';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { DrinkComponent } from './drink/drink.component';
import { DrinkService } from './drink.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyPageComponent,
    HeaderComponent,
    HeaderDialogBoxComponent,
    MainPageComponent,
    DrinkListComponent,
    DrinkComponent,
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    routing,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    Angular2FontawesomeModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  providers: [AuthService, DrinkService],
  bootstrap: [AppComponent],
  entryComponents: [HeaderDialogBoxComponent]


})
export class AppModule { }
