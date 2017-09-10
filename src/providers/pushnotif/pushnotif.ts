import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import *  as firebase from 'firebase/app';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/*
  Generated class for the PushnotifProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PushnotifProvider {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null)

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }

  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if(!user) return;

      const data = {[user.uid]:token}
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
    this.messaging.requestPermission().then(() => {
      console.log('Notification permission granted');
      return this.messaging.getToken();
    })
    .then(token => {
      console.log(token);
      this.updateToken(token)
    })
    .catch(err => {
      console.log('Unable to get permission to notify', err);
    })
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received.', payload);
      this.currentMessage.next(payload);
    });
  }
}
