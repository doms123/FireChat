import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(
    public http: Http,
    public afAuth: AngularFireAuth
  ) {
    console.log('Hello AuthProvider Provider');
  }

  register(email:string, pass:string) {
   return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  login(email:string, pass:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  fbLogin() {
    this.afAuth.auth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => alert(res));
  }

  googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      alert(user)
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
     // var credential = error.credential;
      // ...
    });
  }
}
