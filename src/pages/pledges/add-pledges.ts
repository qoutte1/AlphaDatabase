import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';


@IonicPage()
@Component({
    selector: 'page-add-pledges',
    templateUrl: 'add-pledges.html',
})
export class AddPledgesPage {
  
  pledges: FirebaseListObservable<any>;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public image: any;
  public nm: any; //name
  public ph: any; //phone
  public em: any; //email
  public bd: any; //birthday
  public mj: any; //major
  public eg: any; //expGrad
  public td: any; //tuID
  public ad: any; //address
  public hs: any; //hobbies
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase) {
    this.myPhotosRef = firebase.storage().ref('/PledgePhotos/');
    this.pledges = this.angFireDatabase.list('/Pledges');
  }


  pledgeAdd(): void {
       this.image = this.myPhotoURL;
       this.pledges.push({
           address: this.ad,
           birthday: this.bd,
           email: this.em,
           expGrad: this.eg,
           hobbies: this.hs,
           image: this.image,
           major: this.mj,
           pName: this.nm,
           phone: this.ph,
           tuID: this.td
       });

      
    //------------------------------------------------
      //revert to main page
      this.navCtrl.pop();
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