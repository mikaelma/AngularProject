import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HeaderDialogBoxComponent } from './header-dialog-box.component';
import {MatInputModule,MatFormFieldModule,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {TestingModule} from '../../testing/testing.module';

describe('HeaderDialogBoxComponent', () => {
  let component: HeaderDialogBoxComponent;
  let fixture: ComponentFixture<HeaderDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDialogBoxComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        TestingModule
      ],
      providers:[
        {provide:MatDialogRef,useValue:{}},
        {provide:MAT_DIALOG_DATA,useValue:{}}
      ]
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
