import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProvider {
  usersRef = firebase.database().ref('users/');
  loggedUserId:string;

  constructor(
    public http: Http, 
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedUserId = user.uid;
      }
    });
  }

  users() {
    let promise = new Promise((resolve, reject) => {
      this.usersRef.once('value', (snapshot) => {
        let userData = snapshot.val();
        let userArr = [];
       
        for(let userKey in userData) {
  
            if(!("friends" in userData[userKey])) { // remove all already friends from the lists
              if(userKey != this.loggedUserId) {
                let friendArr = [];

                for(let friendReqKey in userData[userKey].friendReq) {
                  friendArr.push(friendReqKey);
                }

                if(friendArr.indexOf(this.loggedUserId) == -1) {
                  userArr.push(userData[userKey]);
                  userData[userKey]['key'] = userKey;
                }
              }
            }else {
              let friendArr = [this.loggedUserId];
              for(let friendKey in userData[userKey].friends) {
                friendArr.push(friendKey);
              }

              for(let friendReqKey in userData[userKey].friendReq) {
                friendArr.push(friendReqKey);
              }

              if(friendArr.indexOf(this.loggedUserId) == -1) {
                userArr.push(userData[userKey]);
                userData[userKey]['key'] = userKey;
              }
            }
          
        }

        resolve(userArr);
      }).catch((err) => {
        reject(err);
      })
    });
    
    return promise;
  }

  sendFriendRequest(recipient) {
    let promise = new Promise((resolve, reject) => {
      // insert new notification
      firebase.database().ref(`/notification/${recipient.key}`).push({
        senderId: this.loggedUserId,
        isRead: false,
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
