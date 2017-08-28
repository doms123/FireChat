import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Firebase Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Auth Service
import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAAGkJZJsX9QGUEkKzx_ZEEzQWFJJ27oEs",
  authDomain: "ionicapp-2e811.firebaseapp.com",
  databaseURL: "https://ionicapp-2e811.firebaseio.com",
  storageBucket: "ionicapp-2e811.appspot.com",
  messagingSenderId: "1063432282060"
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    HttpModule, 
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
  ]
})
export class AppModule {}
