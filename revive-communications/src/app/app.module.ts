import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBnlL3gKvcM30gWWSQziOhkPQwIdCy7oro",
  authDomain: "revive-communications.firebaseapp.com",
  databaseURL: "https://revive-communications.firebaseio.com",
  projectId: "revive-communications",
  storageBucket: "revive-communications.appspot.com",
  messagingSenderId: "842765911039",
  appId: "1:842765911039:web:197e54136748ea23baddca",
  measurementId: "G-FBLW2LXDC0"
};

//follow-ups call number native
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormsModule, NgForm } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CallNumber
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
