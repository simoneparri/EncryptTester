import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CryptoService } from './crypto.service';

@Injectable()
export class CryptoInterceptor implements HttpInterceptor {
  constructor(private readonly cryptoService: CryptoService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const newRequest = this.cryptRequest(request);

    return next.handle(newRequest).pipe(
      map((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          const newResponse = this.decryptResponse(response);
          return newResponse;
        }
      })
    );;
  }

  private cryptRequest(req: HttpRequest<any>) {
      if (
        req.method.toLowerCase() === 'post' ||
        req.method.toLowerCase() === 'put'
      ) {
        if (req.body instanceof FormData || req.body instanceof Object) {
          if(this.cryptoService.enableCrypto){
              req = req.clone({body:this.cryptoService.encrypt(req.body)});
          }else{
            this.cryptoService.encryptedRequestAES.next(req.body);
          }
        }
      }
      if (
        req.method.toLowerCase() === 'get' ||
        req.method.toLowerCase() === 'delete'
      ) {
        let splitted=req.urlWithParams.split('?');
        let url=splitted[0];
        let queryString=splitted.length>1?splitted[1]:null;
        if (queryString) {
          if(this.cryptoService.enableCrypto){
            req = req.clone({
              url: url+'?q='+this.cryptoService.encrypt(queryString)
            });
          }else{
            this.cryptoService.encryptedRequestAES.next(queryString);
          }
        }
      }

    return req;
  }

  private decryptResponse(res: HttpResponse<any>) {
    if(this.cryptoService.enableCrypto){
      if (res.status === 200) {
        if (res.body) {
          if(this.cryptoService.enableCrypto){
            res = res.clone({
              body: { body: this.cryptoService.decrypt(res.body) }
            });
          }else{
            this.cryptoService.encryptedResponseAES.next(res.body);
          }
        }
      }
    }
    return res;
  }
}
