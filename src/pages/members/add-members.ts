import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Crop } from '@ionic-native/crop';
import firebase from 'firebase';


@IonicPage()
@Component({
    selector: 'page-add-members',
    templateUrl: 'add-members.html',
})
export class AddMembersPage {
  
  members: FirebaseListObservable<any>;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public image: any;
  public nm: any;
  public yr: any;
  public ph: any;
  public em: any;
  public bd: any;
  public bg: any;
  public lt: any;
  public mj: any;
  public eg: any;
  public td: any;
  public ad: any;
  public rm: any;
  public hs: any;
  public po: string = "None";
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase, private crop: Crop) {
    this.myPhotosRef = firebase.storage().ref('/Photos/');
    this.members = this.angFireDatabase.list('/Members');
  }


  memberAdd(): void {
       this.image = this.myPhotoURL;
       this.members.push({
           address: this.ad,
           bigs: this.bg,
           birthday: this.bd,
           email: this.em,
           expGrad: this.eg,
           hobbies: this.hs,
           image: this.image,
           lits: this.lt,
           mName: this.nm,
           major: this.mj,
           phone: this.ph,
           position: this.po,
           roomates: this.rm,
           tuID: this.td,
           year: this.yr
       });

      
    //------------------------------------------------
      //revert to main page
      this.navCtrl.pop();
  }

  selectPhoto(): void {
    Camera.getPicture({
      allowEdit: true,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.cropPhoto();
     // this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  cropPhoto(): void {
    this.crop.crop(this.myPhoto, {quality: 100});
    
    this.uploadPhoto();
  }

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
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