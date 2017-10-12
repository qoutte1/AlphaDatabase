import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';
import { Crop } from '@ionic-native/crop';


@IonicPage()
@Component({
    selector: 'page-alumn-edit-info',
    templateUrl: 'alumn-edit-info.html',
})
export class AlumnEditInfoPage {
  
  alumni: FirebaseListObservable<any>;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public image: any;
  public nm: any; //name
  public yr: any; //year
  public ph: any; //phone
  public em: any; //email
  public bd: any; //birthday
  public mj: any; //major
  public gr: any; //graduated
  public ad: any; //address
  public hs: any; //hobbies
  public jb: any; //job

  alum: FirebaseListObservable<any>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public angFireDatabase: AngularFireDatabase, private crop: Crop) {
    this.myPhotosRef = firebase.storage().ref('/Photos/');
    this.alumni = this.angFireDatabase.list('/Alumni');
    this.alum = navParams.get('alumn');
  }


  alumnEdit(alum): void {
    // this.image = this.myPhotoURL;
    
    // let newImage = memb.image;
    let newName = alum.aName;
    let newYear = alum.year;
    let newPhone = alum.phone;
    let newEmail = alum.email;
    let newBday = alum.birthday;
    let newMajor = alum.major;
    let newGrad = alum.graduated;
    let newAddress = alum.address;
    let newHobbies = alum.hobbies;
    let newJob = alum.job;
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
      if(this.mj != null){
        newMajor = this.mj;
        // this.members.push({major: newMajor});
      }
      if(this.gr != null){
        newGrad = this.gr;
        // this.members.push({expGrad: newGrad});
      }
      if(this.ad != null){
        newAddress = this.ad;
        // this.members.push({address: newAddress});
      }
      if(this.hs != null){
        newHobbies = this.hs;
        // this.members.push({hobbies: newHobbies});
      }
      if(this.jb != null){
        newJob = this.jb;
        // this.members.push({position: newPosition});
      }

    
      //  this.image = this.myPhotoURL;
       this.alumni.update(alum.$key, {
           address: newAddress,
           birthday: newBday,
           email: newEmail,
           graduated: newGrad,
           hobbies: newHobbies,
           aName: newName,
           major: newMajor,
           phone: newPhone,
           job: newJob,
           year: newYear
       });

      
    //------------------------------------------------
      //revert to main page
      this.navCtrl.pop();
      this.navCtrl.pop();
  }

  selectPhoto(alum): void {
    Camera.getPicture({
      allowEdit: true,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.cropPhoto();
      this.uploadPhoto(alum);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  cropPhoto(): void {
    this.crop.crop(this.myPhoto, {quality: 100});
    
    //this.uploadPhoto(memb);
  }

  private uploadPhoto(alum): void {
    var oldRef = firebase.storage().refFromURL(alum.image);

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
        this.alumni.update(alum.$key, { image: this.image});
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