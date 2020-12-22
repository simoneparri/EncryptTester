import { TestBed } from '@angular/core/testing';

import { CryptoInterceptor } from './crypto.interceptor';

describe('EncryptInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CryptoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CryptoInterceptor = TestBed.inject(CryptoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
