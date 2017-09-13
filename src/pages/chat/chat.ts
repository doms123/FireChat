import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from "angularfire2/database";
import { PushnotifProvider } from "../../providers/pushnotif/pushnotif";

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

  title:string;
  body:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    public storage: Storage,
    public authProvider: AuthProvider,
    public app: App,
    public db: AngularFireDatabase,
    public pushnotifProvider: PushnotifProvider
  ) {

    //this.pushnotifProvider.getPermission();
  }


  pushPage(page:string) {
    this.navCtrl.push('UserslistPage');
  }

  sendPushMsg() {
    this.db.list('messages').push({
      title: this.title,
      body: this.body
    });

    this.title = "";
    this.body = "";
  }
}
