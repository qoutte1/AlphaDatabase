import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@IonicPage()
@Component({
    selector: 'page-add-events',
    templateUrl: 'add-events.html',
})
export class AddEventsPage {
  
  events: FirebaseListObservable<any>;

  public da: any; //date
  public in: any; //info
  public tm: any; //time
  public ti: any; //title
  public ampm: any; // am or pm

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
    this.events = this.angFireDatabase.list('/Events');
  }


  eventAdd(): void {
       this.events.push({
           evDate: this.da,
           evInfo: this.in,
           evTime: this.tm,
           evAMPM: this.ampm,
           evTitle: this.ti,
       });

      
    //------------------------------------------------
      //revert to main page
      this.navCtrl.pop();
  }

  

}