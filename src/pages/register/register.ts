import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email:string;
  pass:string;
  registerForm: FormGroup;
  isRegisterDisable:boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder
  ) {
    this.registerForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])")])],
      pass: [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.isRegisterDisable = true;
    this.authProvider.register(this.email, this.pass)
    .then((data) => {
      this.email = '';
      this.pass = '';
      console.log(data)
      this.navCtrl.push(HomePage);
    })
    .catch((err) => {console.log(err)
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000
      });

      toast.present();
    });
    //console.log(res);
  //   this.authProvider.register(this.email, this.pass)
  //   .then((res) => {
  //     let toast = this.toastCtrl.create({
  //       message: 'User was added successfully',
  //       duration: 3000
  //     });
  //     toast.present();
  //     this.isRegisterDisable = false;
  //   })
  //   .catch((err) => {
  //     alert('error')
  //     // let toast = this.toastCtrl.create({
  //     //   message: err.message,
  //     //   duration: 3000
  //     // });
  //     // this.isRegisterDisable = false;
  //   });
  // }
  }
}
