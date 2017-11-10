import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDialogBoxComponent } from './header-dialog-box.component';

describe('HeaderDialogBoxComponent', () => {
  let component: HeaderDialogBoxComponent;
  let fixture: ComponentFixture<HeaderDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
