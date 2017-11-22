import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPageComponent } from './my-page.component';
import {TestingModule} from  '../../testing/testing.module';
import {MyPageDrinkListComponent} from '../my-page-drink-list/my-page-drink-list.component';

describe('MyPageComponent', () => {
  let component: MyPageComponent;
  let fixture: ComponentFixture<MyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPageComponent,MyPageDrinkListComponent],
      imports:[
        TestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
