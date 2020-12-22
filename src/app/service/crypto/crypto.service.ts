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

  encryptedRequestAES = new Subject<string>();
  encryptedResponseAES = new Subject<string>();

  constructor() {}

  public encrypt(input:any):string {
    input=input instanceof String?input:JSON.stringify(input);
    let _key = CryptoJS.enc.Base64.parse(this.KEY);
    let _iv = CryptoJS.enc.Base64.parse(this.IV);
    let encryptedAES = CryptoJS.AES.encrypt(input, _key, {iv: _iv,});
    let ret =encryptedAES.ciphertext.toString(CryptoJS.enc.Base64);
    this.encryptedRequestAES.next(ret);
    return ret;
  }

  public decrypt(input:string):any {
    this.encryptedResponseAES.next(input);
    let _key = CryptoJS.enc.Base64.parse(this.KEY);
    let _iv = CryptoJS.enc.Base64.parse(this.IV);
    let decrypted= CryptoJS.AES.decrypt(input, _key, {iv: _iv,}).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
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
