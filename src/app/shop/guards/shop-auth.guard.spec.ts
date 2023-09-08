import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { shopAuthGuard } from './shop-auth.guard';

describe('shopAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => shopAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
