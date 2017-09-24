import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-userslist',
  templateUrl: 'userslist.html',
})
export class UserslistPage {
  users = [];
  searchUserArr = [];
  searching:boolean = false;
  searchStr: any = '';
  searchControl: FormControl;
  noResult:boolean = false;
  userLoggedId:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    public userProvider: UserProvider,
    public alertCtrl: AlertController
  ) {
    this.userLoggedId = navParams.data.userId;
    this.searchControl = new FormControl();
    this.getUsers();
  }

  getUsers() {
    this.userProvider.users().subscribe(users => {
      let friendArr = [this.userLoggedId];
      let usersList = [];
      for(let userKey in users) {
        let userObj = users[userKey];
        if(userObj.$key == this.userLoggedId) {

          if('friendReq' in userObj) {
            for(let friendUserId in userObj.friendReq){
              if(friendArr.indexOf(friendUserId) == -1) {
                friendArr.push(friendUserId);
              }
            }
          }

          if('friends' in userObj) {
            for(let friendUserId in userObj.friends){
              if(friendArr.indexOf(friendUserId) == -1) {
                friendArr.push(friendUserId);
              }
            }
          }

        }
      }

      for(let userKey in users) {
        let userObj = users[userKey];
        userObj.key = users[userKey].$key;
        if(friendArr.indexOf(users[userKey].$key) == -1) {
          usersList.push(userObj);
        }
      }
      this.users = usersList;
      this.searchUserArr = usersList;
    });
  }

  ionViewDidLoad() {
    this.searchUser();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.searchUser();
    });
  }
    
  onSearchInput() {
    this.searching = true;
  }

  searchUser() {
    this.users = this.searchUserArr;
    if(this.searchStr.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.displayName.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1);
      });

      if(this.users.length == 0) { // no result
        this.noResult = true;
      }else {
        this.noResult = false;
      }
    }
  }

  sendFriendRequest(recipient:any, index) {
    // this.users.splice(index, 1);
    // this.userProvider.sendFriendRequest(recipient).then(() => {

    //   let toast = this.toastCtrl.create({
    //     message: `Friend request to ${recipient.displayName} was sent`,
    //     duration: 5000
    //   });
    //   toast.present();

    //   if(this.users.length == 0) { // no result
    //     this.noResult = true;
    //   }else {
    //     this.noResult = false;
    //   }
    // });

    let confirm = this.alertCtrl.create({
      title: 'Send a friend request?',
      message: `Do you want ${recipient['displayName']} to be your friend?`,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.users.splice(index, 1);
            this.userProvider.sendFriendRequest(recipient).then(() => {

              let toast = this.toastCtrl.create({
                message: `Friend request to ${recipient.displayName} was sent`,
                duration: 5000
              });
              toast.present();

              if(this.users.length == 0) { // no result
                this.noResult = true;
              }else {
                this.noResult = false;
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
