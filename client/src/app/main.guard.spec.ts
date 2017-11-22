import { TestBed, async, inject } from '@angular/core/testing';

import { MainGuard } from './main.guard';
import {TestingModule} from '../testing/testing.module';

describe('MainGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainGuard],
      imports:[TestingModule]
    });
  });

  it('should ...', inject([MainGuard], (guard: MainGuard) => {
    expect(guard).toBeTruthy();
  }));
});
