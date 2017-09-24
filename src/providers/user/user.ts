import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable  } from 'angularfire2/database';

@Injectable()
export class UserProvider {
  usersRef = firebase.database().ref('users/');
  loggedUserId:string;

  constructor(
    public http: Http, 
    public afAuth: AngularFireAuth,
    public afdb: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedUserId = user.uid;
      }
    });
  }

  users() {
    return this.afdb.list(`/users/`);
  }

  sendFriendRequest(recipient) {
    let promise = new Promise((resolve, reject) => {
      // insert new notification
      firebase.database().ref(`/notification/${recipient.key}`).push({
        senderId: this.loggedUserId,
        description: 'requested',
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      // add friendReq node to the sender user
      firebase.database().ref(`users/${this.loggedUserId}/friendReq/${recipient.key}`).set('false');
      // add friend node to the recipient user
      let friendReq =  firebase.database().ref(`users/${recipient.key}/friends/${this.loggedUserId}`).set('false');
      resolve(friendReq);
    });

    return promise;
  }
}
