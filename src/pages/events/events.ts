import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AddEventsPage } from './add-events';



@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage{
    events: FirebaseListObservable<any>;
    todaysDate: string = new Date().toISOString();
    howShow: string = "all"; //holds initial default segment

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    //  this.events = angFireDatabase.list('/Events');
    this.events = this.angFireDatabase.list('Events', {
      query: {
        orderByChild: 'evDate'
      }
    });
  }

  holdEvent(eventID){
    let actionSheet = this.actionSheetCtrl.create({
     buttons: [
        {
         text: 'Delete Event',
         role: 'delete',
         handler: () => {
           this.swipeEvent(eventID);
           
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });
   
   actionSheet.present();
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
