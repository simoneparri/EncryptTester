import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private ENABLECRYPTO:boolean=true;

  private IV= '';
  private KEY= '';

  encryptedRequestBase64 = new Subject<string>();
  encryptedResponseBase64 = new Subject<string>();
  encryptedRequestAES = new Subject<string>();
  encryptedResponseAES = new Subject<string>();

  constructor() {}

  public encrypt(input:any):string {
    let _key = CryptoJS.enc.Utf8.parse(this.KEY);
    let _iv = CryptoJS.enc.Utf8.parse(this.IV);
    let encryptedAES = CryptoJS.AES.encrypt(
      JSON.stringify(input), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    this.encryptedRequestAES.next(encryptedAES.toString());
    let encrypted=btoa(encryptedAES.toString()); //TO BASE64
    this.encryptedRequestBase64.next(encrypted.toString());
    return encrypted.toString();
  }

  public decrypt(input:string):any {
    this.encryptedResponseBase64.next(input);
    input=atob(input); //FROM BASE64
    this.encryptedResponseAES.next(input);
    let _key = CryptoJS.enc.Utf8.parse(this.KEY);
    let _iv = CryptoJS.enc.Utf8.parse(this.IV);
    return JSON.parse(CryptoJS.AES.decrypt(
      input, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8));
  }

  public set iv(input:string){
    this.IV=input;
  }
  public set key(input:string){
    this.KEY=input;
  }

  public set enableCrypto(input:boolean){
    this.ENABLECRYPTO=input;
  }
  public get enableCrypto():boolean{
    return this.ENABLECRYPTO;
  }

}
