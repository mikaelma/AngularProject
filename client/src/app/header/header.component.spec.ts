import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable} from 'rxjs/Rx';
import { HeaderComponent } from './header.component';
import {TestingModule} from '../../testing/testing.module';
import {MatDialog} from '@angular/material';
import {Injectable} from '@angular/core';
import { By } from '@angular/platform-browser';

@Injectable()
class MockDialog{
  constructor(){}

  open(){}

}

class MockDialogRef{
  constructor(){}

  afterClosed(){
    return Observable.from([{
      email:"test@test.test",
      password:'testpassword'
    }])
  }
}

class MockDialogRegistrationRef{
  afterClosed(){
    return Observable.from([
      {
        firstname:"test",
        surname:"testersen",
        email:"test@test.test",
        confirmPassword:"testpassword"
      }
    ])
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[TestingModule],
      providers:[
        {provide:MatDialog,useClass:MockDialog}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog and submit login',()=>{
    let dialogService = TestBed.get(MatDialog);
    spyOn(dialogService,'open').and.returnValue(new MockDialogRef());
    component.openDialogLogin();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.username'));
    let el = de.nativeElement;
    const content = el.textContent;
    expect(component.loginDisplayName).toBe("test testersen");
    expect(content).toContain("test testersen");
  })

  it('Should register a new user',()=>{
    let dialogService = TestBed.get(MatDialog);
    spyOn(dialogService,'open').and.returnValue(new MockDialogRegistrationRef());
    component.openDialogRegister();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.username'));
    let el = de.nativeElement;
    const content = el.textContent;
    expect(component.loginDisplayName).toBe("test testersen");
    expect(content).toContain("test testersen");
  })
});


