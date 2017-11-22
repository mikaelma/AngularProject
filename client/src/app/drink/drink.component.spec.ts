import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {DrinkService} from '../drink.service';
import {MockDrink} from '../../testing/mock-drink.service';
import { DrinkComponent } from './drink.component';
import {TestingModule} from '../../testing/testing.module';

class MockActivatedRoute{
  constructor(){}

  params():Observable<Array<any>>{
    return Observable.create(observer=>{
      let arr = new Array<any>();
      arr['id'] = 1;
    });
  }
}

describe('DrinkComponent', () => {
  let component: DrinkComponent;
  let fixture: ComponentFixture<DrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkComponent ],
      imports:[
        TestingModule
      ],
      providers:[
        {provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) }},
        {provide:DrinkService,useClass:MockDrink}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
