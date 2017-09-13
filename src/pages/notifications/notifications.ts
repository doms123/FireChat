import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotifProvider } from '../../providers/notif/notif';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifCount:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public notifProvider: NotifProvider
  ) {
    this.countUnreadNotif();
  }

  countUnreadNotif() {
    this.notifProvider.countUnreadNotif().then(unreadCount => {
      this.notifCount = unreadCount;
      console.log(unreadCount);
    });
  }
}
