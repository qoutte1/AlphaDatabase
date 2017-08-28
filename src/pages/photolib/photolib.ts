import { Component} from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera } from 'ionic-native';
import { ImageViewerController } from 'ionic-img-viewer';
import { ActionSheetController } from 'ionic-angular'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PhotoLibrary } from '@ionic-native/photo-library';
//import { PhotoViewer } from '@ionic-native/photo-viewer';
import firebase from 'firebase';


declare var cordova: any;

@Component({
  selector: 'page-photolib',
  templateUrl: 'photolib.html'
})



export class PhotolibPage{
  gallery: FirebaseListObservable<any>;
  myPhotosRef: any; //**REFERENCE TO FIREBASE STORAGE */
  myPhoto: any;
  myPhotoURL: any;
  public img: any;
  _imageViewerCtrl: ImageViewerController;
  storageDirectory: string = '';



// private membersService:MembersService *****WOULD GO IN HERE INSTEAD OF FIREBASE
  constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public angFireDatabase: AngularFireDatabase, private imageViewerCtrl: ImageViewerController, private transfer: FileTransfer, private file: File) {
    this.myPhotosRef = firebase.storage().ref('/Photolib/');
    this.gallery = this.angFireDatabase.list('/Gallery');
    this._imageViewerCtrl = imageViewerCtrl;

    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
});
 }
  


  // getGallery(): void {
  //   // loading photo URLS from /Gallery to access photos in storage
  //   this.gallery = this.angFireDatabase.list('/Gallery');
  // }

  // ngOnInit(): void {
  //   this.getGallery();
  // }


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


  download(URL, NAME) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      console.log(URL);
      fileTransfer.download(URL, this.file.syncedDataDirectory + 'NAME').then((entry) => {
        console.log('download complete: ' + entry.toURL());
        
        const alertSuccess = this.alertCtrl.create({
                title: `Download Succeeded!`,
                subTitle: ` was successfully downloaded to: ${entry.toURL()}`,
                buttons: ['Ok']
              });

              alertSuccess.present();
      }, (error) => {
        // handle error

        const alertFailure = this.alertCtrl.create({
                title: `Download Failed!`,
                subTitle: `${URL} was not successfully downloaded. Error code: ${error.code}`,
                buttons: ['Ok']
              });

              alertFailure.present()
      });
}
  
  

// https://github.com/dsgriffin/ionic-3-file-transfer-example/blob/master/src/pages/home/home.ts
  pressEvent(photoID, myImage): void{
   // const fileTransfer: FileTransferObject = this.transfer.create();
    const imageLocation = myImage.src;
    var oldRef = firebase.storage().refFromURL(myImage.src);

    var downloadRef = firebase.storage().refFromURL(myImage.src);
    var img;
    downloadRef.getDownloadURL().then(function(url) {
       img = encodeURI(url);
      
      console.log(img);
      
    }).catch(function(error) {
      //handle errors
      const refFailure = this.alertCtrl.create({
                title: `Ref Failed!`,
                buttons: ['Ok']
              });

              refFailure.present();
    });
    
    let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: 'Save Image',
         role: 'Save',
         handler: () => {
           this.download('https://firebasestorage.googleapis.com/v0/b/alpha-f1c44.appspot.com/o/Photolib%2F4a8ccaba-26b8-4958-8917%2FmyPhoto.png?alt=media&token=5c75d1d0-9fcd-4f40-9930-ee0e5e38f576', 'myPhoto.png');
          //  fileTransfer.download(encodeURI(img), cordova.file.dataDirectory + 'myPhoto.png').then((entry) => {

          //     const alertSuccess = this.alertCtrl.create({
          //       title: `Download Succeeded!`,
          //       subTitle: `${myImage.src} was successfully downloaded to: ${entry.toURL()}`,
          //       buttons: ['Ok']
          //     });

          //     alertSuccess.present();

          //   }, (error) => {

          //     const alertFailure = this.alertCtrl.create({
          //       title: `Download Failed!`,
          //       subTitle: `${myImage.src} was not successfully downloaded. Error code: ${error.code}`,
          //       buttons: ['Ok']
          //     });

          //     alertFailure.present();

          //     });
           

           console.log('Save clicked');
         }
       },
        {
         text: 'Delete Image',
         role: 'Delete',
         handler: () => {
           console.log('Delete clicked');
           oldRef.delete().then(function(){
             //File delete successfully
           }).catch(function(error){
            // and error occured
           });
           this.gallery.remove(photoID);
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
