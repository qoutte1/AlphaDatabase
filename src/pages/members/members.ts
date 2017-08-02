import { Component, OnInit} from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
// import { Member } from './member';
// import { MembersService } from '../../app/services/members.service';
// import { FirebaseService } from './../../providers/firebase-service';
import { InfoPage } from '../info/info';
import { AddMembersPage } from './add-members';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera } from 'ionic-native';
// import { ImageProvider } from '../../providers/image-provider';
import firebase from 'firebase';


@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})

export class MembersPage implements OnInit{
  // members: Member[];
  // selectedMember: Member;
  members: FirebaseListObservable<any>;
  myPhotosRef: any; //**REFERENCE TO FIREBASE STORAGE */
  myPhoto: any;
  myPhotoURL: any;


// private membersService:MembersService *****WOULD GO IN HERE INSTEAD OF FIREBASE
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public angFireDatabase: AngularFireDatabase) {
    // this.members = angFireDatabase.list('/Members'); 
    this.myPhotosRef = firebase.storage().ref('/Photos/');
 }

  getMembers(): void {
    // this.membersService.getMembers().then(members => this.members = members);
    this.members = this.angFireDatabase.list('/Members');
  }

  ngOnInit(): void {
    this.getMembers();
  }

   swipeEvent(memberID): void{
    let prompt = this.alertCtrl.create({
      title: 'Remove Member',
      message: 'This will permanently remove member',
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
            this.members.remove(memberID);
  
          }
        }
      ]
    })

    prompt.present();
  }

  addMember(){
    this.navCtrl.push(AddMembersPage);
  }


  // addMember():void{
  //   let prompt = this.alertCtrl.create({
  //     title: 'New Member',
  //     message: 'Enter members details',
  //     inputs: [
  //       {
  //         name: 'mName',
  //         placeholder: 'name'
  //       },
  //       {
  //         name: 'year',
  //         placeholder: 'year'
  //       },
  //       {
  //         name: 'phone',
  //         placeholder: 'phone'
  //       },
  //       {
  //         name: 'email',
  //         placeholder: 'email'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log("cancel clicked");
  //         }
  //       },
  //       {
  //         text: 'Add Member',
  //         handler: data => {
            
  //           this.selectPhoto();
            
  //           data.image = this.myPhotoURL;
  //           this.members.push({
  //             image: data.image,
  //             mName: data.mName,
  //             year: data.year,
  //             phone: data.phone,
  //             email: data.email
  //           });

  //         }
  //       }
  //     ]
  //   })

  //   prompt.present();
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


//**** ADD BUTTON */ ***NOW POPOVER.....
  // memberAdd(item){
  //   this.navCtrl.push(InfoPage, {
  //     item: item
  //   });
  // }
  // presentPopover(myEvent){
  //   let popover = this.popoverCtrl.create(MyPopoverPage);
  //   popover.present({
  //     ev: myEvent
  //   });
  // }

 

  itemSelected(event, member){
    this.navCtrl.push(InfoPage, {
      member: member
    });
  }
}
