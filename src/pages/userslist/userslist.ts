import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userProvider: UserProvider
  ) {
    this.getUsers();
    this.searchControl = new FormControl();
  }

  getUsers() {
    console.log('test');
    this.userProvider.users().then((res:any) => {
      this.users = res;
      this.searchUserArr = res;
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
