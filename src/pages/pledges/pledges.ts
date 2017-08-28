import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera } from 'ionic-native';
import firebase from 'firebase';
import { ActionSheetController } from 'ionic-angular'
import { AddPledgesPage } from './add-pledges';

@Component({
  selector: 'page-pledges',
  templateUrl: 'pledges.html'
})
export class PledgesPage{
    pledges: FirebaseListObservable<any>;
    myPhotosRef: any; //**REFERENCE TO FIREBASE STORAGE */
    myPhoto: any;
    myPhotoURL: any;

  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
      //this.pledges = angFireDatabase.list('/Pledges');
      this.pledges = this.angFireDatabase.list('Pledges', {
      query: {
        orderByChild: 'pName'
      }
    });

      this.myPhotosRef = firebase.storage().ref('/PledgePhotos/');
  }

   holdEvent(pledgeID, pledge){
    let actionSheet = this.actionSheetCtrl.create({
     buttons: [
      //  {
      //    text: 'Copy phone',
      //    role: 'copy',
      //    handler: () => {
      //      this.clipboard.copy(member.phone);
      //      console.log('copy phone clicked');
      //    }
      //  },
      //  {
      //    text: 'Copy email',
      //    role: 'copy',
      //    handler: () => {
      //      this.clipboard.copy(member.email);
      //      console.log('copy email clicked');
      //    }
      //  },
        {
         text: 'Delete pledge',
         role: 'delete',
         handler: () => {
           this.swipeEvent(pledgeID, pledge);
           
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

  swipeEvent(pledgeID, pledge): void{
    var oldRef = firebase.storage().refFromURL(pledge.image);
    let prompt = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'This will permanently remove pledge.',
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
            oldRef.delete().then(function(){
              // File deleted successfully
            }).catch(function(error){
              // an error occurred
            });
            this.pledges.remove(pledgeID);
  
          }
        }
      ]
    })

    prompt.present();
  }

  addPledge(){
    this.navCtrl.push(AddPledgesPage);
  }



  //------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------
  selectPhoto(): void {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL; //**USING downloadURL TO DISPLAY PHOTO */
      });
      
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }



}
