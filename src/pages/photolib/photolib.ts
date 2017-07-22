import { Component, OnInit} from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera } from 'ionic-native';
import { ImageViewerController } from 'ionic-img-viewer';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ActionSheetController } from 'ionic-angular'
//import { PhotoViewer } from '@ionic-native/photo-viewer';
import firebase from 'firebase';




@Component({
  selector: 'page-photolib',
  templateUrl: 'photolib.html'
})



export class PhotolibPage implements OnInit{
  gallery: FirebaseListObservable<any>;
  myPhotosRef: any; //**REFERENCE TO FIREBASE STORAGE */
  myPhoto: any;
  myPhotoURL: any;
  public img: any;
  _imageViewerCtrl: ImageViewerController;


// private membersService:MembersService *****WOULD GO IN HERE INSTEAD OF FIREBASE
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public angFireDatabase: AngularFireDatabase, private imageViewerCtrl: ImageViewerController, private photoLibrary: PhotoLibrary) {
    this.myPhotosRef = firebase.storage().ref('/Photolib/');
    this.gallery = this.angFireDatabase.list('/Gallery');
    this._imageViewerCtrl = imageViewerCtrl;
 }
  


  getGallery(): void {
    // loading photo URLS from /Gallery to access photos in storage
    this.gallery = this.angFireDatabase.list('/Gallery');
  }

  ngOnInit(): void {
    this.getGallery();
  }


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
        this.img = this.myPhotoURL;
        this.gallery.push({ image: this.img});
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


  presentImage(myImage){
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
      
  }


  pressEvent(myImage){

    var album="Camera Roll";

    let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: 'Save Image',
         role: 'Save',
         handler: () => {
           console.log('Save clicked');
           this.photoLibrary.saveImage(myImage, album, null);
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

     
    
        
  //   let alert = this.alertCtrl.create({
  //       title: 'Saved image',
  //       buttons: ['Dismiss']
  //       });
  //       alert.present();
  }



}
