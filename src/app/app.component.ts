import { Component } from '@angular/core';
import { Platform,  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LandingPage } from '../pages/landing/landing';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any; 

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    public storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    storage.get('userId').then((user) => {
      if(user != null) {
        this.rootPage = HomePage;
      }else {
        this.rootPage = LandingPage;
      }
    });
    
    // if(this.authProvider.isLoggedIn()) {
    //   this.rootPage = HomePage;
    // }else {
    //   this.rootPage = LandingPage;
    // }
    // console.log(this.authProvider.isLoggedIn())
  }
}
