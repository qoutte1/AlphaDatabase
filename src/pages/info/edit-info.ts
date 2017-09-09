import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';
import { Crop } from '@ionic-native/crop';


@IonicPage()
@Component({
    selector: 'page-edit-info',
    templateUrl: 'edit-info.html',
})
export class EditInfoPage {
  
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
  public po: string;

  memb: FirebaseListObservable<any>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase, private crop: Crop) {
    this.myPhotosRef = firebase.storage().ref('/Photos/');
    this.members = this.angFireDatabase.list('/Members');
    this.memb = navParams.get('member');
  }


  memberEdit(memb): void {
    // this.image = this.myPhotoURL;
    
    // let newImage = memb.image;
    let newName = memb.mName;
    let newYear = memb.year;
    let newPhone = memb.phone;
    let newEmail = memb.email;
    let newBday = memb.birthday;
    let newBigs = memb.bigs;
    let newLits = memb.lits;
    let newMajor = memb.major;
    let newGrad = memb.expGrad;
    let newID = memb.tuID;
    let newAddress = memb.address;
    let newRoomates = memb.roomates;
    let newHobbies = memb.hobbies;
    let newPosition = memb.position;
      if(this.nm != null){
        newName = this.nm;
        // this.members.push({mName: newName});
      }
      if(this.yr != null){
        newYear = this.yr;
        // this.members.push({year: newYear});
      }
      if(this.ph != null){
        newPhone = this.ph;
        // this.members.push({phone: newPhone});
      }
      if(this.em != null){
        newEmail = this.em;
        // this.members.push({email: newEmail});
      }
      if(this.bd != null){
        newBday = this.bd;
        // this.members.push({birthday: newBday});
      }
      if(this.bg != null){
        newBigs = this.bg;
        // this.members.push({bigs: newBigs});
      }
      if(this.lt != null){
        newLits = this.lt;
        // this.members.push({lits: newLits});
      }
      if(this.mj != null){
        newMajor = this.mj;
        // this.members.push({major: newMajor});
      }
      if(this.eg != null){
        newGrad = this.eg;
        // this.members.push({expGrad: newGrad});
      }
      if(this.td != null){
        newID = this.td;
        // this.members.push({tuID: newID});
      }
      if(this.ad != null){
        newAddress = this.ad;
        // this.members.push({address: newAddress});
      }
      if(this.rm != null){
        newRoomates = this.rm;
        // this.members.push({roomates: newRoomates});
      }
      if(this.hs != null){
        newHobbies = this.hs;
        // this.members.push({hobbies: newHobbies});
      }
      if(this.po != null){
        newPosition = this.po;
        // this.members.push({position: newPosition});
      }

    
      //  this.image = this.myPhotoURL;
       this.members.update(memb.$key, {
           address: newAddress,
           bigs: newBigs,
           birthday: newBday,
           email: newEmail,
           expGrad: newGrad,
           hobbies: newHobbies,
           lits: newLits,
           mName: newName,
           major: newMajor,
           phone: newPhone,
           position: newPosition,
           roomates: newRoomates,
           tuID: newID,
           year: newYear
       });

      
    //------------------------------------------------
      //revert to main page
      this.navCtrl.pop();
      this.navCtrl.pop();
  }

  selectPhoto(memb): void {
    Camera.getPicture({
      allowEdit: true,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.cropPhoto();
      this.uploadPhoto(memb);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  cropPhoto(): void {
    this.crop.crop(this.myPhoto, {quality: 100});
    
    //this.uploadPhoto(memb);
  }

  private uploadPhoto(memb): void {
    var oldRef = firebase.storage().refFromURL(memb.image);

    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        oldRef.delete().then(function(){
          //File delte successfully
        }).catch(function(error){
          //uh-oh, an error occured
        });
        this.myPhotoURL = savedPicture.downloadURL;
        this.image = this.myPhotoURL;
        this.members.update(memb.$key, { image: this.image});
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