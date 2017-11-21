import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';
import {MatFormFieldModule,MatInputModule,MatDialogModule,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
describe('ChangePasswordDialogComponent', () => {
  let component: ChangePasswordDialogComponent;
  let fixture: ComponentFixture<ChangePasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordDialogComponent ],
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatDialogModule,BrowserAnimationsModule],
      providers:[
        {provide:MatDialogRef,useValue:{}},
        {provide:MAT_DIALOG_DATA,useValue:{}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
