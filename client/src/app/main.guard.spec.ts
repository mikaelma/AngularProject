import { TestBed, async, inject,tick,fakeAsync } from '@angular/core/testing';
import {Route,Router} from '@angular/router';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import { MainGuard } from './main.guard';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {TestingModule} from '../testing/testing.module';
import {Observable} from 'rxjs/Rx';
import {AuthService} from './auth.service';

let routes:Route[] = [{path:'unauthorized',component:UnauthorizedComponent}]

describe('MainGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[UnauthorizedComponent],
      providers: [MainGuard],
      imports:[
        TestingModule,
        RouterTestingModule.withRoutes(routes)
      ]
    });
  });

  it('should create guard', inject([MainGuard], (guard: MainGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should navigate to unauthorized', inject([MainGuard], (guard: MainGuard) => {
    fakeAsync(()=>{
      let auth = TestBed.get(AuthService);
      let router = TestBed.get(Router);
      let location = TestBed.get(Location);
      router.initialNavigation();

      spyOn(auth,'verifyToken').and.returnValue(()=>{
        return Observable.create(observer=>{
          observer.error();
          observer.complete();
        });
      });
      guard.canActivate();
      tick(50);
      expect(location.path()).toBe('/unauthorized');


    });
  }));
});
