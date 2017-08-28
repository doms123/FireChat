import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Ionic Modules for Imports
import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { LandingPageModule } from '../pages/landing/landing.module';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';

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
    MyApp,
    AboutPage,
    ContactPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    HttpModule, 
    HomePageModule,
    LoginPageModule,
    RegisterPageModule,
    LandingPageModule,
    IonicStorageModule.forRoot(),
    ResetPasswordPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
  ]
})
export class AppModule {}
