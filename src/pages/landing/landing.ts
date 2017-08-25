import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
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
    public authProvider: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  pushLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  fbLoginBtn() {
    this.authProvider.fbLogin();
  }

  googleLoginBtn() {
    this.authProvider.googleLogin();
  }
}
