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
export class CryptInterceptor implements HttpInterceptor {
  constructor(private readonly cryptoService: CryptoService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    console.log('%cCryptInterceptor! \nrequest ','background: #222; color: #bada55');
    console.log(request);
    const newRequest = this.cryptRequest(request);
    console.log('%cNew request','background: #222; color: #bada55');
    console.log(newRequest);

    return next.handle(newRequest).pipe(
      map((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          console.log('%cCryptInterceptor! \nresponse ','background: #222; color: #bada55');
          console.log(response);
          const newResponse = this.decryptResponse(response);
          console.log('%cNew response ','background: #222; color: #bada55');
          console.log(newResponse);
          return newResponse;
        }else{
          console.log('%cCryptInterceptor! \nresponse ','background: #222; color: #bada55');
          console.log(response);
        }
      })
    );;
  }

  cryptRequest(req: HttpRequest<any>) {
    if(this.cryptoService.enableCrypto){
      if (
        req.method.toLowerCase() === 'post' ||
        req.method.toLowerCase() === 'put'
      ) {
        if (req.body instanceof FormData || req.body instanceof Object) {
          req = req.clone({body:this.cryptoService.encrypt(req.body)});
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
          req = req.clone({
            url: url+'?q='+this.cryptoService.encrypt(queryString)
          });
        }
      }
    }
    return req;
  }
  decryptResponse(res: HttpResponse<any>) {
    if(this.cryptoService.enableCrypto){
      if (res.status === 200) {
        if (res.body) {
          res = res.clone({
            body: { body: this.cryptoService.decrypt(res.body) }
          });
        }
      }
    }
    return res;
  }
}
