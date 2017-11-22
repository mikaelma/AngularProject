import {NgModule} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatOptionModule, MatSelectModule,
    MatToolbarModule, MatListModule, MatSnackBarModule, MatGridListModule
} from '@angular/material'
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuth} from './mock-auth.service';
import {AuthService} from '../app/auth.service';
import {JwtHelperService} from '../app/jwthelper.service';
import {DrinkService} from '../app/drink.service';
import {MockDrink} from './mock-drink.service';
import {MockJwt} from './jwt-mock.service'

@NgModule({
    providers:[
        {provide:MatDialogRef,useValue:{}},
        {provide:MAT_DIALOG_DATA,useValue:{}},
        {provide:AuthService,useClass:MockAuth},
        {provide:JwtHelperService,useClass:MockJwt},
        {provide:DrinkService,useClass:MockDrink}
      ],
      exports:[
          BrowserAnimationsModule,
          MatButtonModule,
          MatDialogModule,
          MatFormFieldModule,
          MatIconModule,
          MatInputModule,
          MatToolbarModule,
          MatSnackBarModule,
          MatInputModule,
          MatOptionModule,
          MatSelectModule,
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          MatListModule,
          InfiniteScrollModule
        ]
})
export class TestingModule{}
