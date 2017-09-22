import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { Storage } from '@ionic/storage';
import { FirebaseListObservable } from "angularfire2/database";
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
  notifList:FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    public storage: Storage,
    public authProvider: AuthProvider,
    public app: App,
    public pushnotifProvider: PushnotifProvider,
  ) {
    this.storage.get('userId').then(userId => {
      this.loggedUserId = userId;
      this.loadChatUsers(userId);
    });
  }

  pushPage(page:string) {
    this.navCtrl.push('UserslistPage');
  }

  loadChatUsers(userId) {
    this.chatProvider.loadChatUsersFriendReq(userId).subscribe(users => {
      console.log(users)
    });
  }
}
