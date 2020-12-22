import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../service/crypto/crypto.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {

  public iv: string = 'GtjZ4+YnwCgs3diN6+kcFw==';
  public key: string = 'E3IJcCIheoIGfKLOFKL30nlgCbZVJEv0FMNF2XHMp5A=';

  public input:string = '';
  public output:string = '';

  constructor(
    private readonly cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
  }


  public encrypt() {
    this.cryptoService.enableCrypto=true;
    this.cryptoService.iv=this.iv;
    this.cryptoService.key=this.key;
    this.output=this.cryptoService.encrypt(this.input)
  }
  public decrypt() {
    this.cryptoService.enableCrypto=true;
    this.cryptoService.iv=this.iv;
    this.cryptoService.key=this.key;
    this.output=this.cryptoService.decrypt(this.input)
  }
}
