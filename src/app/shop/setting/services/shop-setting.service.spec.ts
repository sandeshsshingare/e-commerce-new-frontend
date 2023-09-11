import { TestBed } from '@angular/core/testing';

import { ShopSettingService } from './shop-setting.service';

describe('ServiceService', () => {
  let service: ShopSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
