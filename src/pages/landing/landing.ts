import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public storage: Storage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  pushLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  fbLoginBtn() {
    this.authProvider.fbLogin().then((res) => {
      let data = res.user;
      this.storage.set('userId', data.uid);
      this.storage.set('userName', data.displayName);
      this.storage.set('userEmail', data.email);
      this.navCtrl.push(HomePage);
    });
  }

  googleLoginBtn() {
    this.authProvider.googleLogin().then((res) => {
      let data = res.user;
      this.storage.set('userId', data.uid);
      this.storage.set('userName', data.displayName);
      this.storage.set('userEmail', data.email);
      this.navCtrl.push(HomePage);
    });
  }
}
