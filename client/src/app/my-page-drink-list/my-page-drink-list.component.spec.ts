import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPageDrinkListComponent } from './my-page-drink-list.component';

describe('MyPageDrinkListComponent', () => {
  let component: MyPageDrinkListComponent;
  let fixture: ComponentFixture<MyPageDrinkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPageDrinkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPageDrinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
