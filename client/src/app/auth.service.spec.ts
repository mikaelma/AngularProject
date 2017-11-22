import { TestBed, inject,fakeAsync,tick } from '@angular/core/testing';
import {User} from './user';
import { AuthService } from './auth.service';
import {JwtHelperService} from './jwthelper.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTE0MTQwOTgwM2U2MDMyYzMwMDdlNmEiLCJmaXJzdE5hbWUiOiJIYW5zIiwibGFzdE5hbWUiOiJCcmVubmEiLCJlbWFpbCI6ImhhQGJyLmJyIiwiZmF2b3VyaXRlRHJpbmtzIjpbXSwiY3JlYXRlZERyaW5rcyI6W10sImlhdCI6MTUxMTM3NDAwOSwiZXhwIjoxNTExMzkyMDA5fQ.wfaLBVlOAgA7KGNQgmdMuQJvHLN8zi65EG-jrSg_VQQ";


describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtHelperService,
        AuthService],
        imports:[HttpClientTestingModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    fakeAsync(()=>{
      let http = TestBed.get(HttpClient);
      spyOn(http,'post').and.returnValue(()=>{
        return Observable.from([{
          token:token
        }])
      });
      let user:User;
      service.loginUser("test","testmail").subscribe((res)=>{
        user = res;
      });
      tick(50);
      expect(user.email).toBe("ha@br.br");

    });
  }));
});
