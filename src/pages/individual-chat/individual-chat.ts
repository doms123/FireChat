import { ChatProvider } from './../../providers/chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-individual-chat',
  templateUrl: 'individual-chat.html',
})
export class IndividualChatPage {
  recieverId:string;
  receiverName:string;
  receiverStatus:string;
  tabBarElement:any;
  chatMsg:string;
  chatRoom:string;
  chats:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider
  ) {

    this.recieverId     = navParams.get('key');
    this.receiverName   = navParams.get('displayName');
    this.receiverStatus = navParams.get('status');
    // this.chatRoom       = navParams.get('chatRoom');
    this.tabBarElement  = document.querySelector(".tabbar.show-tabbar");

    this.loadChats();
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = "none";
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = "flex";
  }

  sendMessage() {
    console.log('this.recieverId', this.recieverId)
    this.chatProvider.sendMessage(this.chatMsg, this.recieverId);
    this.chatMsg = "";
  }

  loadChats() {
  //    this.chatProvider.loadChats().subscribe((chats) => {
  //       this.chats = chats;
  //       console.log('chats', chats);
  //    });
  // }

    this.chatProvider.loadChats().then(chats => {
      this.chats = chats;
    });
  }
}
