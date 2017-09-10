import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:string = "ChatPage";
  tab2:string = "NotificationsPage";
  tab3:string = "ProfilePage";
  tab4:string = "SettingsPage";

  constructor() {

  }
}
