import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { DrinkService } from './drink.service';
import {JwtHelperService} from './jwthelper.service';

describe('DrinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrinkService,JwtHelperService],
      imports:[HttpClientTestingModule]
    });
  });

  it('should be created', inject([DrinkService], (service: DrinkService) => {
    expect(service).toBeTruthy();
  }));
});
