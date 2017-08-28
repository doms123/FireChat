import { AuthProvider } from './../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name:string;
  showSearchBar:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public authProvider: AuthProvider
  ) { }

  logoutBtn() {
    this.storage.clear();
    this.navCtrl.setRoot('LandingPage', {}, {animate: true, direction: 'forward'});
  }

  search() {
   this.showSearchBar = !this.showSearchBar;
  }
}
