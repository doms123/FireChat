import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
  users: FirebaseListObservable<any>;
  user: FirebaseObjectObservable<any>;
  loggedUserId:string;
  loggedUserName:string;
  loggedUserPhoto:string;
  usersRef = firebase.database().ref('/users');
  chats: FirebaseListObservable<any>;

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {

    afAuth.authState.subscribe(user => {
      // console.log(user)
      this.user = this.db.object('/users/'+user.uid, {preserveSnapshot: true});
      this.user.subscribe(userData => {
        this.user = userData.val();
        //console.log(userData.val())
        let photo;
        if(!('photo' in this.user)) {
          photo = 'none';
        }else {
          photo = userData.val().photo;
        }
        this.getLoggedUserPhoto(photo);
        this.loggedUserId   = userData.key;
        this.loggedUserName = userData.val().displayName;
      })
    });
  }

  getUsers() {
    this.users = this.db.list('/users', {
      query: {
        orderByChild: 'isVerified',
        equalTo: true
      }
    });
    return this.users;
  }

  getLoggedUserPhoto(photo:string) {
    this.loggedUserPhoto = photo;
  }

  getLoggedUserId() {
    return this.loggedUserId;
  }

  chatMember(user2Id:string, user2:string) {
    let user1Id = this.loggedUserId;
    let user1  = this.loggedUserName;
    // let user2 = receiverId;
    let roomName = (user1 < user2 ? user1+'_'+user2 : user2+'_'+user1);
    let obj:object = {};
    obj[user1] = true;
    obj[user2] = true;

    this.db.object('/chat_room/'+roomName).set(obj);

    return roomName;
  }

  sendMessage(chatRoom:string, chatMsg:string) {
    this.db.list('/chats/'+chatRoom).push({
      name: this.loggedUserName,
      senderPhoto: this.loggedUserPhoto,
      message: chatMsg,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  }

  loadChats(chatRoom:string) {
    const chatsObservable = this.db.list('/chats/'+chatRoom);
    return chatsObservable;
  }
}
