import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera } from 'ionic-native';
import firebase from 'firebase';
import { Clipboard } from '@ionic-native/clipboard';
import { ActionSheetController } from 'ionic-angular';
import { AddAlumniPage } from './add-alumni';
import { AlumnInfoPage } from '../alumn_info/alumn-info';

@Component({
  selector: 'page-alumni',
  templateUrl: 'alumni.html'
})
export class AlumniPage{
    alumni: FirebaseListObservable<any>;
    myPhotosRef: any; // Reference to firebase storage
    myPhoto: any;
    myPhotoURL: any;

  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase, private clipboard: Clipboard, public actionSheetCtrl: ActionSheetController) {
    this.alumni = this.angFireDatabase.list('Alumni', {
      query: {
        orderByChild: 'aName'
      }
    });
      this.myPhotosRef = firebase.storage().ref('/Photos/');
      
  }


  holdEvent(alumnID, alumn){
    let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: 'Copy phone',
         role: 'copy',
         handler: () => {
           this.clipboard.copy(alumn.phone);
           console.log('copy phone clicked');
         }
       },
       {
         text: 'Copy email',
         role: 'copy',
         handler: () => {
           this.clipboard.copy(alumn.email);
           console.log('copy email clicked');
         }
       },
        {
         text: 'Delete alumn',
         role: 'delete',
         handler: () => {
           this.swipeEvent(alumnID, alumn);
           
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

  swipeEvent(alumnID, alumn): void{
    var oldRef = firebase.storage().refFromURL(alumn.image);
   let prompt = this.alertCtrl.create({
     title: 'Are you sure?',
     message: 'This will permanently remove alumn.',
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
           this.alumni.remove(alumnID);
         }
       }
     ]
   })

   prompt.present();
 }

 addAlumn(){
  this.navCtrl.push(AddAlumniPage);
}

//--------------------------------------------------------------------
//-------------------------------------------------------------------

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


 itemSelected(event, alumn){
  this.navCtrl.push(AlumnInfoPage, {
    alumn: alumn
  });
  }
}
