import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
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
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    this.encryptedRequestAES.next(encryptedAES.toString());
    let encrypted=btoa(encryptedAES.toString());
    this.encryptedRequestBase64.next(encrypted.toString());
    return encrypted.toString();
  }

  public decrypt(input:string):any {
    let _key = CryptoJS.enc.Utf8.parse(this.KEY);
    let _iv = CryptoJS.enc.Utf8.parse(this.IV);
    this.encryptedResponseBase64.next(input);
    input=atob(input);
    this.encryptedResponseAES.next(input);
    let decrypted= CryptoJS.AES.decrypt(
      input, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
      return JSON.parse(decrypted);
  }

  public set iv(input:string){
    // this.IV=Base64.decode(input);
    this.IV=atob(input)
  }
  public set key(input:string){
    // this.KEY=Base64.decode(input);
    this.KEY=atob(input)
  }

  public set enableCrypto(input:boolean){
    this.ENABLECRYPTO=input;
  }
  public get enableCrypto():boolean{
    return this.ENABLECRYPTO;
  }

}
