import { TestBed, inject,fakeAsync,tick } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { DrinkService } from './drink.service';
import {JwtHelperService} from './jwthelper.service';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTE0MTQwOTgwM2U2MDMyYzMwMDdlNmEiLCJmaXJzdE5hbWUiOiJIYW5zIiwibGFzdE5hbWUiOiJCcmVubmEiLCJlbWFpbCI6ImhhQGJyLmJyIiwiZmF2b3VyaXRlRHJpbmtzIjpbXSwiY3JlYXRlZERyaW5rcyI6W10sImlhdCI6MTUxMTM3NDAwOSwiZXhwIjoxNTExMzkyMDA5fQ.wfaLBVlOAgA7KGNQgmdMuQJvHLN8zi65EG-jrSg_VQQ";

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

  it('should be created', inject([DrinkService], (service: DrinkService) => {
    fakeAsync(()=>{
      
    });
  }));
});
