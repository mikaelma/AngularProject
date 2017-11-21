import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {JwtHelperService} from './jwthelper.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
});
