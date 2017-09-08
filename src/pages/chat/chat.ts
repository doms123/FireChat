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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    public storage: Storage,
    public authProvider: AuthProvider,
    public app: App
  ) {
    
    this.getUsers();
    storage.get('userId').then(userId => {
      this.loggedUserId = userId;
    });

    this.getLoggedUserId();
  }

  getUsers() {
    this.chatProvider.getUsers().subscribe(users => {
      users.forEach((data, index) => {
        if(data.$key == this.loggedUserId) {
          users.splice(index, 1);
        }
     });
      this.users = users;
    });
  }

  getLoggedUserId() {
    this.loggedUserId = this.chatProvider.getLoggedUserId();
  }

  logoutBtn() {
    this.authProvider.loggedOut();
    this.storage.clear();
    this.app.getRootNav().setRoot('LandingPage');
  }

  chatBox(user) {
    let chatRoom = this.chatProvider.chatMember(user.$key, user.displayName);
    this.navCtrl.push('IndividualChatPage', {
      receiverName: user.displayName,
      receiverStatus: user.status,
      chatRoom: chatRoom,
      receiverPhoto: user.photo
    });
  }
}
