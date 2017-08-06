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

      this.myPhotosRef = firebase.storage().ref('/Photos/');
  }
// Rather than retrieving the executives based off a members position. 
// I should lay out the member based off a pre-defined html template.
// In order of the position...for whoever the president is pull their info into the president template.




//   itemTapped(event, item) {
//     // That's right, we're pushing to ourselves!
//     this.navCtrl.push(ListPage, {
//       item: item
//     });
//   }
}
