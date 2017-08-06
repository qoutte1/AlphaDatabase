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
  public tm: string = "12:00"; //time
  public ti: any; //title
  public ampm: string = "am"; // am or pm
  public etm: string = "12:00"; //end time
  public eampm: string = "pm"; //end am or pm

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
    this.events = this.angFireDatabase.list('/Events');
  }


  eventAdd(): void {
       this.events.push({
           evDate: this.da,
           evTime: this.tm,
           evAMPM: this.ampm,
           evEndTime: this.etm,
           evEndAMPM: this.eampm,
           evTitle: this.ti,
           evInfo: this.in
       });

      
    //------------------------------------------------
      //revert to main page
      this.navCtrl.pop();
  }

  

}