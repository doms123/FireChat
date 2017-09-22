import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NotifProvider } from '../../providers/notif/notif';
import { FirebaseListObservable } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifCount:any;
  userLoggedId:string;
  notifLists:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public notifProvider: NotifProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private datePipe: DatePipe
  ) {
    this.userLoggedId = navParams.data.userId;
    this.loadListOfNotif(this.userLoggedId);
    this.loadNotifCount(this.userLoggedId);
  }

  loadNotifCount(userId) {
    this.notifProvider.getNotifCount(userId).subscribe(res => {
      this.notifCount = res.length;
    });
  }

  loadListOfNotif(userId) {
    this.notifProvider.loadListOfNotif(userId).subscribe(notifList => {
      let notifArr = [];
      for(let notif of notifList) {
        this.notifProvider.getUsers().subscribe(users => {
          for (var key in users) {
            
            if(key == notif.senderId) {
              users[key].notifDesc = notif.description;
              users[key].notifKey = notif.$key;
              users[key].userId = key;
              users[key].dateAdded = notif.dateAdded;
              notifArr.push(users[key]);
            }
          }
        });
      }
      this.notifLists = notifArr;
    });
  }

  acceptRequest(user:object, i:number) {
    let confirm = this.alertCtrl.create({
      title: 'Accept this friend request?',
      message: `Do you accept ${user['displayName']} to be your friend?`,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            console.log('userobj', user);
            this.notifProvider.acceptFriendRequest(this.userLoggedId, user['userId'], user['notifKey']).then(res => {
              let toast = this.toastCtrl.create({
                message: `You are now friends with ${user['displayName']}`,
                duration: 3000
              });
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
