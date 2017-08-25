import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string;
  pass:string;
  isLoginDisable:boolean = true;
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider
  ) {
    this.loginForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
      pass: [null, Validators.required]
    });
  }

  pushSignUp() {
  	this.navCtrl.push(RegisterPage);
  }

  login() {
    this.authProvider.login(this.email, this.pass)
    .then((data) => {
      console.log(data);
      this.navCtrl.push(HomePage, {
        email: data.email
      });
    })
    .catch((err) => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 5000
      });

      toast.present();
    })
  }
}
