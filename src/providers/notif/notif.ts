import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class NotifProvider {
  loggedUserId:string;

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      this.loggedUserId = user.uid;
    });
  }

  countUnreadNotif() {
    let promise = new Promise((resolve, reject) => {
      this.db.database.ref(`/notification/${this.loggedUserId}`).once('value', function(snapshot) {
        resolve(snapshot.val())
      });
    });
    
    return promise;
  }

}
