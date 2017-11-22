import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrinkListComponent } from './drink-list.component';
import {DrinkService} from '../drink.service';
import {MockDrink} from '../../testing/mock-drink.service';
import {TestingModule} from '../../testing/testing.module';


describe('DrinkListComponent', () => {
  let component: DrinkListComponent;
  let fixture: ComponentFixture<DrinkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkListComponent ],
      imports:[
        TestingModule
      ],providers:[
        {provide:DrinkService,useClass:MockDrink}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
