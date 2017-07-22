import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';

@Component({
  selector: 'page-alumni',
  templateUrl: 'alumni.html'
})
export class AlumniPage{
    members: FirebaseListObservable<any>;
    myPhotosRef: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
      this.members = angFireDatabase.list('/Members');
      this.myPhotosRef = firebase.storage().ref('/Photos/');
  }




//   itemTapped(event, item) {
//     // That's right, we're pushing to ourselves!
//     this.navCtrl.push(ListPage, {
//       item: item
//     });
//   }
}
