import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DrinkListComponent} from '../drink-list/drink-list.component'
import { MainPageComponent } from './main-page.component';
import {TestingModule} from '../../testing/testing.module';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainPageComponent,
        DrinkListComponent
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
