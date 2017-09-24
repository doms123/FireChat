import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { Storage } from '@ionic/storage';
import { FirebaseListObservable } from "angularfire2/database";
import { PushnotifProvider } from "../../providers/pushnotif/pushnotif";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  users:any[];
  names:any;
  userLoggedId:string;
  title:string;
  body:string;
  notifList:FirebaseListObservable<any>;
  friends:any[] = [];
  friendOffline:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    public storage: Storage,
    public authProvider: AuthProvider,
    public app: App,
    public pushnotifProvider: PushnotifProvider,
  ) {

    this.storage.get('userId').then(userId => {
      this.authProvider.loggedUserMetaData(userId).subscribe(userData => {
        this.loadChatUsers(userId, userData.displayName);
      });
    });
  }

  pushPage(page:string) {
    this.navCtrl.push('UserslistPage');
  }

  loadChatUsers(userId, userName) {
    this.chatProvider.loadChatUsersFriendReq(userId).subscribe(users => {
      let friendArr = [];
      if('friendReq' in users) {
        for(let friendKey in users.friendReq) {
          if(friendArr.indexOf(friendKey) == -1) {
            friendArr.push(friendKey);
          }
        }
      }

      if('friends' in users) {
        for(let friendKey in users.friends) {
          if(friendArr.indexOf(friendKey) == -1) {
            friendArr.push(friendKey);
          }
        }
      }

      if(friendArr.length > 0) {
        for(let friendKey of friendArr) {
          this.chatProvider.getFriendMetaData(friendKey).subscribe(userData => {
            let roomName = (userName < userData.displayName ? userName+'_'+userData.displayName : userData.displayName+'_'+userName);
            roomName = roomName.replace(/\ /g, '-');

            this.chatProvider.loadChatUsersFriendReq(userId).subscribe(user => {
              let unreadObj = user.unreadMessage;
              let unreadCounter = 0;
              for(let unreadKey in unreadObj) {
                if(roomName in unreadObj[unreadKey]) {
                  unreadCounter++;
                }
              }

              userData['unreadCount'] = unreadCounter;

              for(let key in this.friends) {
                let friends = this.friends;
                if(userData.$key == friends[key].$key) {
                  this.friends.splice(parseInt(key), 1);
                }
              }

          
              this.chatProvider.lastUreadMessage(roomName).subscribe(messages => {
                let messageLength = Object.keys(messages).length;
                let messageCounter = 1;
                for(let messageKey in messages) {
                  let messageObj = messages[messageKey];
                  if(messageLength == messageCounter) {
                    console.log('messageObj', messageObj);
                    userData['lastMessage'] = messageObj.message;
                    userData['lastMessageDate'] = messageObj.timestamp;
                  }
                  messageCounter++;
                } 
              });
              

              this.friends.push(userData);
              console.log('userData', userData);
            });
          });
        }
      }
    });
  }

  pushChatRoom(user:any) {
    this.chatProvider.chatMember(user.$key , user.displayName);
    this.navCtrl.push('IndividualChatPage', user);
  }
}
