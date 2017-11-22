import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DrinkListComponent} from '../drink-list/drink-list.component'
import { MainPageComponent } from './main-page.component';
import {TestingModule} from '../../testing/testing.module';
import {MyPageDrinkListComponent} from '../my-page-drink-list/my-page-drink-list.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainPageComponent,
        DrinkListComponent,
        MyPageDrinkListComponent
       ],
       imports:[TestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
