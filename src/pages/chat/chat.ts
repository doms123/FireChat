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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider
  ) {
    alert('test')
    this.getUsers();
  }

  getUsers() {
    this.chatProvider.getUser()
      .then(users => {
        alert()
        console.log(users.val());
      })
      .catch(err => {
        console.log('error');
      });
  }
}
