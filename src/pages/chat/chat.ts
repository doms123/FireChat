import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  users:any;
  names:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider
  ) {
    this.getUsers();
  }

  getUsers() {
    this.names = this.chatProvider.getUser().on('value', (users) => {
      console.log(users.val())
    });
  }
}
