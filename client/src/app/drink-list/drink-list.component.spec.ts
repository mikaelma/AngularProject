import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatIconModule,MatFormFieldModule,MatListModule} from '@angular/material';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { DrinkListComponent } from './drink-list.component';
import {DrinkService} from '../drink.service';
import {MockDrink} from '../../testing/mock-drink.service';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('DrinkListComponent', () => {
  let component: DrinkListComponent;
  let fixture: ComponentFixture<DrinkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkListComponent ],
      imports:[
        MatIconModule,
        MatFormFieldModule,
        MatListModule,
        InfiniteScrollModule,
        RouterModule,
        RouterTestingModule
      ],providers:[
        {provide:DrinkService,useClass:MockDrink}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
