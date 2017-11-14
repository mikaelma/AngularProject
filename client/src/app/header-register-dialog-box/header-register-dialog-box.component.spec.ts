import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRegisterDialogBoxComponent } from './header-register-dialog-box.component';

describe('HeaderRegisterDialogBoxComponent', () => {
  let component: HeaderRegisterDialogBoxComponent;
  let fixture: ComponentFixture<HeaderRegisterDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderRegisterDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRegisterDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
