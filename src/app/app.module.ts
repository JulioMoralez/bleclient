import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {HttpInterceptorService} from './httpInterceptor.service';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { PlaceComponent } from './place/place.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {BeaconPipe} from './service/beacon-pipe';
import {PlacePipe} from './service/place-pipe';
import {DevicePipe} from './service/device-pipe';
import { JournalComponent } from './journal/journal.component';
import { OperComponent } from './oper/oper.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'place', component: PlaceComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'journal', component: JournalComponent},
  { path: '**', component: MainComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    PlaceComponent,
    HeaderComponent,
    BeaconPipe,
    PlacePipe,
    DevicePipe,
    JournalComponent,
    OperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ScrollingModule
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
