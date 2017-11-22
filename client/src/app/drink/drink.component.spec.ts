import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatButtonModule} from '@angular/material';
import {Observable} from 'rxjs/Rx';
import {MatIconModule,MatFormFieldModule,MatListModule,MatInputModule,MatToolbarModule} from '@angular/material';
import { from } from 'rxjs/observable/from';
import {ActivatedRoute} from '@angular/router';
import {DrinkService} from '../drink.service';
import {MockDrink} from '../../testing/mock-drink.service';
import {RouterTestingModule} from '@angular/router/testing';

import { DrinkComponent } from './drink.component';

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
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatToolbarModule
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
