import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TabsPageModule } from '../tabs/tabs.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TabsPageModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {
  
}

