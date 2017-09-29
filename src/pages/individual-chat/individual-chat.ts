import { ChatProvider } from './../../providers/chat/chat';
import { Component, ViewChild, ElementRef } from '@angular/core';
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
  lastChatKey:string = '';

  @ViewChild('content') content;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider
  ) {
    this.recieverId     = navParams.get('key');
    this.receiverName   = navParams.get('displayName');
    this.receiverStatus = navParams.get('status');
    this.tabBarElement  = document.querySelector(".tabbar.show-tabbar");

    this.loadChats();
    this.removeUnreadMsg();
  }

  scrollToBottom() {
    this.content.nativeElement.scrollIntoView(false);
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
    this.removeUnreadMsg();
    setTimeout(() => {
      this.scrollToBottom();
    }, 200);
  }

  loadChats() {
    this.chatProvider.loadChats().then(chats => {
      this.chats = chats;
      setTimeout(() => {
        this.scrollToBottom();
      }, 400);
    });
  }

  removeUnreadMsg() {
    this.chatProvider.getRemoveUnreadMsg();
  }

  doInfinite() {
    this.chatProvider.scrollChats();
    console.log('Begin async operation');
  }
}
