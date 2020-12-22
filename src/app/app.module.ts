import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientService } from './service/http-client.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { CryptoService } from './service/crypto/crypto.service';
import { CryptoInterceptor } from './service/crypto/crypto.interceptor';
import { TesterComponent } from './view/tester/tester.component';

const MATERIAL = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
];
@NgModule({
  declarations: [AppComponent, HomeComponent, TesterComponent],
  imports: [
    MATERIAL,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    HttpClientService,

    // START copy for insert  CryptoInterceptor
    CryptoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CryptoInterceptor,
      multi: true,
    }
    // END copy for insert  CryptoInterceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
