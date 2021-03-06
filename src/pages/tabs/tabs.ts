import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PushnotifProvider } from '../../providers/pushnotif/pushnotif';
import { NotifProvider } from '../../providers/notif/notif';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:string = "ChatsPage";
  tab2:string = "NotificationsPage";
  tab3:string = "UserslistPage";
  tab4:string = "SettingsPage";

  message:any;
  notifCount:any; 
  unreadMsgCount:any; 
  loggedUserId:string;
  tabsParam = {};

  constructor(
    public pushnotifProvider: PushnotifProvider,
    public notifProvider: NotifProvider,
    public storage: Storage
  ) {

    this.storage.get('userId').then(userId => {
      this.loggedUserId = userId;
      this.loadNotifCount(userId);
      this.loadUnreadMsgCount(userId);
      this.tabsParam['userId'] = userId;
    });
  }

  ngOnInit() {
    this.pushnotifProvider.getPermission();
    this.pushnotifProvider.receiveMessage();
  } 

  loadNotifCount(userId) {
    this.notifProvider.getNotifCount(userId).subscribe(res => {
      this.notifCount = res.length;
    });
  }

  loadUnreadMsgCount(userId) {
    this.notifProvider.getUnreadMsgCount(userId).subscribe(unread => {
      this.unreadMsgCount = unread.length;
    });
  }
}
