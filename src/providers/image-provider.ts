import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImageProvider {

  public cameraImage: string;

  constructor(private _CAMERA : Camera) {
  }

  // uses a Promise to return an image selected from the device
  // photolibrary as a base64 data URI
  selectImage() : Promise<any> {
    return new Promise(resolve => {
      let cameraOptions : CameraOptions = {
             sourceType         : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this._CAMERA.DestinationType.DATA_URL,
             quality            : 100,
             targetWidth        : 320,
             targetHeight       : 240,
             encodingType       : this._CAMERA.EncodingType.JPEG,
             correctOrientation : true
         };

         this._CAMERA.getPicture(cameraOptions)
         .then((data) =>
         {
           this.cameraImage = "data:image/jpeg;base64," + data;
           resolve(this.cameraImage);
         });
    });
  }


}
