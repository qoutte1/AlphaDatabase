import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Camera } from 'ionic-native';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlumnEditInfoPage } from '../alumn_info/alumn-edit-info';
// import firebase from 'firebase';

/**
 * Generated class for the InfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-alumn-info',
  templateUrl: 'alumn-info.html',
})
export class AlumnInfoPage {
    alumni: FirebaseListObservable<any>;
  // public myPhotosRef: any;
  // public myPhoto: any;
  // public myPhotoURL: any;

  alumn: {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
    
    // this.members = angFireDatabase.list('/Members'); 
    // this.myPhotosRef = firebase.storage().ref('/Photos/');

    this.alumn = navParams.get('alumn');
  }




 editInfo(event, alumn){
    this.navCtrl.push(AlumnEditInfoPage, {
      alumn: alumn
    });
  }



}
