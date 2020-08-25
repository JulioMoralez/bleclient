import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {HttpInterceptorService} from './httpInterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
