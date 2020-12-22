# POC AES ANGULAR  INTERCEPTOR

This Spa has an interceptor that encrypt every request before sending to the backend server, and decryp every response.
The CryptoService use AES algorytm and use an IV and KEY string encoded in Base64
                    
```seq
Front End->Back End: Http Request
Note right of Front End: Http Interceptor - Encrypt/Decrypt AES
Back End->Front End: Http Response
```
##How start PoC
```bash
npm install  
npm run start
```
You can use this project for your playground or for debugging the backend development

##How to use in your project
For integrate this interceptor in your Angular spa go through the following steps.

#### Step 1
Run the following commands for install Crypto-JS library in to your project
```bash
npm install @types/crypto-js --save  
npm install crypto-js --save  
```
#### Step 2
Copy the folder crypto to your project
```bash
└───crypto
 |───crypto.interceptor.spec.ts
 |───crypto.interceptor.ts
 |───crypto.service.spec.ts
└───crypto.service.ts
```

#### Step 3 
Edit your AppModule or equivalent and add  CryptoService and CryptoInterceptor on the prividers section, like this:
```typescript
...
@NgModule({
  declarations: [AppComponent, HomeComponent, TesterComponent],
  imports: [...],
  providers: [
    ...
    // START CryptoInterceptor
    CryptoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CryptoInterceptor,
      multi: true,
    }
    // END CryptoInterceptor
  ],
  bootstrap: [...],
})
export class AppModule {}

```
#### Step 4
Before you use the interceptor you **must** set these following parameters of CryptoService

- this.cryptoService.enableCrypto=*true*;
- this.cryptoService.iv=*BASE64_KEY*;
- this.cryptoService.key=*BASE64_KEY*;

these properties must be taken from an env. file or from an other propreties file of your project



------------

#### Documentation
- [Crypto-JS](https://cryptojs.gitbook.io/docs/)
- [AES algorytm](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
