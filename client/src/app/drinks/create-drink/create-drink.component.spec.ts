import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DrinkService} from '../../drink.service';
import {MockDrink} from '../../../testing/mock-drink.service';

import { CreateDrinkComponent } from './create-drink.component';
import {MatToolbarModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatSnackBarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CreateDrinkComponent', () => {
  let component: CreateDrinkComponent;
  let fixture: ComponentFixture<CreateDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDrinkComponent ],
      imports:[
        MatToolbarModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers:[
        {provide:DrinkService,useClass:MockDrink}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
