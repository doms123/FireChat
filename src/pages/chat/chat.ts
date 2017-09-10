import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  users:any[];
  names:any;
  loggedUserId:string;
  loggedUserName:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    public storage: Storage,
    public authProvider: AuthProvider,
    public app: App
  ) {

  }


  pushPage(page:string) {
    this.navCtrl.push('UserslistPage');
  }
}
