import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../service/crypto/crypto.service';
import { HttpClientService } from '../../service/http-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly httpClient: HttpClientService,

  ) {}

  public enableCrypto:boolean=true;

  public iv: string = '';
  public key: string = '';

  public requestTypes = ['GET', 'POST', 'PUT', 'DELETE'];
  public _requestType: string = this.requestTypes[0];
  public url: string = ' http://localhost:8080/testfilter/test';

  public inputChoice:boolean=true;
  public queryString: string = '';
  public httpParmas: string = '';

  public request: string = '';
  public response: string = '';

  public encryptedRequestAES:string = '';
  public encryptedResponseAES:string = '';


  public showSpinner=false;
  public get isPostOrPut(){
    if(this.requestType=== this.requestTypes[0] ||this.requestType=== this.requestTypes[3]){
      return false;
    }else{
      return true;
    }
  }
  public get requestType(){
    return this._requestType;
  }
  public set requestType(input:string){
    this._requestType=input;
    this.reset();
  }

  ngOnInit(): void {
    this.cryptoService.encryptedRequestAES.subscribe(succ=>{this.encryptedRequestAES=succ});
    this.cryptoService.encryptedResponseAES.subscribe(succ=>{this.encryptedResponseAES=succ});
  }

  public reset(){
    this.encryptedRequestAES='';
    this.encryptedResponseAES='';
    this.response='';
  }

  public doRequest() {
    console.clear();
    this.reset();
    this.showSpinner=true;
    this.cryptoService.enableCrypto=this.enableCrypto;
    this.cryptoService.iv=this.iv;
    this.cryptoService.key=this.key;
    switch (this.requestType) {
      case this.requestTypes[0]:
        this.httpClient.get(this.url, this.queryString,this.httpParmas).subscribe(succ=>{
          this.showSpinner=false;
          this.response=JSON.stringify(succ);
        }, err=>{
          this.showSpinner=false;
          this.encryptedResponseAES='error';
          this.response=JSON.stringify(err);
        });
        break;
      case this.requestTypes[1]:
        this.httpClient.post(this.url, this.request).subscribe(succ=>{
          this.response=JSON.stringify(succ);
        }, err=>{
          this.showSpinner=false;
          this.encryptedResponseAES='error';
          this.response=JSON.stringify(err);
        });
        break;
      case this.requestTypes[2]:
        this.httpClient.put(this.url, this.request).subscribe(succ=>{
          this.response=JSON.stringify(succ);
        }, err=>{
          this.showSpinner=false;
          this.encryptedResponseAES='error';
          this.response=JSON.stringify(err);
        });
        break;
      case this.requestTypes[3]:
        this.httpClient.delete(this.url, this.queryString,this.httpParmas).subscribe(succ=>{
          this.response=JSON.stringify(succ);
        }, err=>{
          this.showSpinner=false;
          this.encryptedResponseAES='error';
          this.response=JSON.stringify(err);
        });
        break;
    }
  }

}
