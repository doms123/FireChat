import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

@Injectable()
export class UserProvider {
  usersRef = firebase.database().ref('users/');

  constructor(public http: Http) {
    
  }

  users() {
    let promise = new Promise((resolve, reject) => {
      this.usersRef.once('value', function(snapshot) {
        let userData = snapshot.val();
        let userArr = [];

        for(let userKey in userData) {
          userArr.push(userData[userKey]);
        }

        resolve(userArr);
      }).catch((err) => {
        reject(err);
      })
    });
    
    return promise;
  }
}
