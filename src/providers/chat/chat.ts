import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
  users: FirebaseListObservable<any>;

  constructor(
    public http: Http,
    public db: AngularFireDatabase
  ) {

  }

  getUser() {
    return firebase.database().ref('/users').orderByChild('isVerified').equalTo(true);
  }
}
