import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AddEventsPage } from './add-events';


@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage{
    events: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
    //  this.events = angFireDatabase.list('/Events');
    this.events = this.angFireDatabase.list('Events', {
      query: {
        orderByChild: 'evDate'
      }
    });
  }

  swipeEvent(eventID): void{
    let prompt = this.alertCtrl.create({
      title: 'Remove Event',
      message: 'This will permanently remove event',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("cancel clicked");
          }
        },
        {
          text: 'Remove',
          handler: data => {
            this.events.remove(eventID);
  
          }
        }
      ]
    })

    prompt.present();
  }

  addEvent(){
    this.navCtrl.push(AddEventsPage);
  }

  

}
