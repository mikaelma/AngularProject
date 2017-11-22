import { async, ComponentFixture, TestBed,fakeAsync,tick} from '@angular/core/testing';
import {DrinkService} from '../drink.service';
import {MockDrink} from '../../testing/mock-drink.service';
import {Drink,Ingredient} from '../drink';

import { CreateDrinkComponent } from './create-drink.component';
import {TestingModule} from '../../testing/testing.module';

describe('CreateDrinkComponent', () => {
  let component: CreateDrinkComponent;
  let fixture: ComponentFixture<CreateDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDrinkComponent ],
      imports:[
        TestingModule
      ],
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
