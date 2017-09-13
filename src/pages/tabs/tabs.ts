import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PushnotifProvider } from '../../providers/pushnotif/pushnotif';

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

  constructor(
    public pushnotifProvider: PushnotifProvider
  ) {}

  ngOnInit() {
    this.pushnotifProvider.getPermission();
    this.pushnotifProvider.receiveMessage();
    this.message = this.pushnotifProvider.currentMessage;
  }

}
