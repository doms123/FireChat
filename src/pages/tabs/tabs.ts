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
  tab1:string = "ChatPage";
  tab2:string = "NotificationsPage";
  tab3:string = "UserslistPage";
  tab4:string = "SettingsPage";

  message:any;
  notifCount:any;  
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
    });
  }

  ngOnInit() {
    this.pushnotifProvider.getPermission();
    this.pushnotifProvider.receiveMessage();
  }

  loadNotifCount(userId) {
    this.notifProvider.getNotifCount(userId).subscribe(res => {
      this.notifCount = res.length;
      this.tabsParam['userId'] = userId;
    });
  }
}
