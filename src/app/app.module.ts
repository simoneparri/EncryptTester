import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientService } from './service/http-client.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CryptoService } from './service/crypto.service';
import { CryptInterceptor } from './service/crypt.interceptor';



const MATERIAL=[
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    MATERIAL,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CryptoService,HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CryptInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
