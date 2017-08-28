import { HomePage } from './../../pages/home/home';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor(
    public http: Http,
    public afAuth: AngularFireAuth,
    public storage: Storage,
  ) { }

  register(email:string, pass:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  resetPassword(email:string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  login(email:string, pass:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  fbLogin() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  googleLogin() {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
