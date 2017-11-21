import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule,
  MatToolbarModule, MatListModule, MatSnackBarModule, MatGridListModule
} from "@angular/material";

import {AuthService} from './auth.service';
import {MockAuth} from '../testing/mock-auth.service';
import {JwtHelperService} from './jwthelper.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      imports:[
        RouterModule,
        MatToolbarModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers:[
        {provide:AuthService,useClass:MockAuth},
        JwtHelperService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Drink');
  }));
 
});
