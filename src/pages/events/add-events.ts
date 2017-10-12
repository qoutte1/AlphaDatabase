import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { WheelSelector } from '@ionic-native/wheel-selector';




@IonicPage()
@Component({
    selector: 'page-add-events',
    templateUrl: 'add-events.html',

})
export class AddEventsPage {
  
  events: FirebaseListObservable<any>;

  //  jsonData = {
  //   hours: [
  //     {description: "1"},
  //     {description: "2"},
  //     {description: "3"},
  //     {description: "4"},
  //     {description: "5"},
  //     {description: "6"},
  //     {description: "7"},
  //     {description: "8"},
  //     {description: "9"},
  //     {description: "10"},
  //     {description: "11"},
  //     {description: "12"},
  //   ],
  //   minutes: [
  //     {description: "00"},
  //     {description: "01"},
  //     {description: "02"},
  //     {description: "03"},
  //     {description: "04"},
  //     {description: "05"},
  //     {description: "06"},
  //     {description: "07"},
  //     {description: "08"},
  //     {description: "09"},
  //     {description: "10"},
  //     {description: "11"},
  //     {description: "12"},
  //     {description: "13"},
  //     {description: "14"},
  //     {description: "15"},
  //   ],
  //   ampm: [
  //     {description: "AM"},
  //     {description: "PM"}
  //   ]
  
  // };
  // selected: string;


  public da: any; //date
  public in: any; //info
  public ti: any; //title
  //-----time--------------------
  public startH: string = "12";
  public startM: string = ":00";
  public tm: string = this.startH.concat(this.startM); //time
  public ampm: string = "am"; // am or pm
  //-----end-------------------------------
  public endH: string = "12";
  public endM: string = ":00";
  public etm: string = this.endH.concat(this.endM); //end time
  public eampm: string = "pm"; //end am or pm
  //-------------------------------------------
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase, public alertCtrl: AlertController) {
    this.events = this.angFireDatabase.list('/Events');
  }


  eventAdd(): void {
    this.tm = this.startH.concat(this.startM);
    this.etm = this.endH.concat(this.endM);
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

  // selectTime(){

  // }

  

}