import { ChatProvider } from './../../providers/chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-individual-chat',
  templateUrl: 'individual-chat.html',
})
export class IndividualChatPage {
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
    this.receiverName   = navParams.get('receiverName');
    this.receiverStatus = navParams.get('receiverStatus');
    this.chatRoom       = navParams.get('chatRoom');
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
    this.chatProvider.sendMessage(this.chatRoom, this.chatMsg);
    this.chatMsg = "";
  }

  loadChats() {
     this.chatProvider.loadChats(this.chatRoom).subscribe((chats) => {
        this.chats = chats;
     });

     //this.chats =
  }
}
