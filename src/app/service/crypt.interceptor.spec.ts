import { TestBed } from '@angular/core/testing';

import { CryptInterceptor } from './crypt.interceptor';

describe('EncryptInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CryptInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CryptInterceptor = TestBed.inject(CryptInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
