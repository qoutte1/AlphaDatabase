import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Camera } from 'ionic-native';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import firebase from 'firebase';

/**
 * Generated class for the InfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
    members: FirebaseListObservable<any>;
  // public myPhotosRef: any;
  // public myPhoto: any;
  // public myPhotoURL: any;

  member: {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
    
    // this.members = angFireDatabase.list('/Members'); 
    // this.myPhotosRef = firebase.storage().ref('/Photos/');

    this.member = navParams.get('member');
  }








}
