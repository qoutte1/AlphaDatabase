import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';

@Component({
  selector: 'page-executive',
  templateUrl: 'executive.html'
})
export class ExecutivePage{
    members: FirebaseListObservable<any>;
    executive: FirebaseListObservable<any>;
    myPhotosRef: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
      this.members = angFireDatabase.list('/Members');
      this.executive = angFireDatabase.list('/Executive');
      this.myPhotosRef = firebase.storage().ref('/Photos/');
  }




//   itemTapped(event, item) {
//     // That's right, we're pushing to ourselves!
//     this.navCtrl.push(ListPage, {
//       item: item
//     });
//   }
}
