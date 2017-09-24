import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ChatProvider {
  users: FirebaseListObservable<any>;
  user: FirebaseObjectObservable<any>;
  loggedUserId:string;
  loggedUserName:string;
  loggedUserPhoto:string;
  usersRef = firebase.database().ref('/users');
  chats: FirebaseListObservable<any>;
  roomName:any;

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {

    afAuth.authState.subscribe(user => {
      this.user = this.db.object('/users/'+user.uid, {preserveSnapshot: true});
      this.user.subscribe(userData => {
        this.user = userData.val();
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
    roomName = roomName.replace(/\ /g, '-');
    let obj:object = {};
    obj[user1] = true;
    obj[user2] = true;

    this.db.object('/chat_room/'+roomName).set(obj);
    this.roomName  = roomName;
    return roomName;
  }

  sendMessage(chatMsg:string, receiverId:string) {
    this.db.list('/chats/'+this.roomName).push({
      name: this.loggedUserName,
      senderPhoto: this.loggedUserPhoto,
      message: chatMsg,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    
    let unreadObj = {};
    unreadObj[this.roomName] = true;
    this.db.list(`/users/${receiverId}/unreadMessage/`).push(unreadObj);
  }

  loadChats() {
    const chatsObservable = this.db.list('/chats/'+this.roomName);
    return chatsObservable;
  }

  loadChatUsersFriendReq(loggedUserId:string) {
    return this.db.object(`/users/${loggedUserId}/`);
  }

  getFriendMetaData(friendKey) {
    return this.db.object(`/users/${friendKey}/`);
  }

  lastUreadMessage(roomName) {
    return this.db.object(`/chats/${roomName}/`);
  }
}
