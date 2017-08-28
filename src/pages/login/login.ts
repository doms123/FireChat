import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string;
  pass:string;
  isLoginDisable:boolean = false;
  loginForm: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public storage: Storage
  ) {
    this.loginForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
      pass: [null, Validators.required]
    });
  }

  pushSignUp() {
    this.navCtrl.push('RegisterPage');
  }

  pushResetPass() {
    this.navCtrl.push('ResetPasswordPage');
  }

  login() {
    this.isLoginDisable = true;
    this.authProvider.login(this.email, this.pass)
    .then((res) => { 
      if(!res.emailVerified) {
        let toast = this.toastCtrl.create({
          message: 'Please verify your email to active your account',
          duration: 5000
        });
        this.isLoginDisable = false;
        toast.present();
      }else {
        this.storage.set('userId', res.uid);
        this.storage.set('userName', res.displayName);
        this.storage.set('userEmail', res.email);
        this.navCtrl.push('HomePage');
      }
    })
    .catch((err) => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 5000
      });
      this.isLoginDisable = false;
      toast.present();
    })
  }
}
