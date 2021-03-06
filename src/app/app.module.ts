import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';


import { MyApp } from './app.component';
import { MembersPage } from '../pages/members/members';
import { ListPage } from '../pages/list/list';
import { ExecutivePage } from '../pages/executive/executive';
import { InfoPage } from '../pages/info/info';
import { AddMembersPage } from '../pages/members/add-members';
import { AlumniPage } from '../pages/alumni/alumni';
import { PledgesPage } from '../pages/pledges/pledges';
import { AddPledgesPage } from '../pages/pledges/add-pledges';
import { PhotolibPage } from '../pages/photolib/photolib';
import { EventsPage } from '../pages/events/events';
import { AddEventsPage } from '../pages/events/add-events';
import { EditInfoPage } from '../pages/info/edit-info';
import { AlumnInfoPage } from '../pages/alumn_info/alumn-info';
import { AlumnEditInfoPage } from '../pages/alumn_info/alumn-edit-info';
import { AddAlumniPage } from '../pages/alumni/add-alumni';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { Camera } from '@ionic-native/camera';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Clipboard } from '@ionic-native/clipboard';
import { Crop } from '@ionic-native/crop';
import { WheelSelector } from '@ionic-native/wheel-selector';
//import { PhotoViewer } from '@ionic-native/photo-viewer';
// import { ImageProvider } from '../providers/image-provider';
// import { FirebaseService } from './../providers/firebase-service';

// Initialize Firebase

 export const firebaseConfig = {
    apiKey: "AIzaSyA4Ss-HEDhLNPM_-Wa_kPo8SBVQU8V1Rf0",
    authDomain: "alpha-f1c44.firebaseapp.com",
    databaseURL: "https://alpha-f1c44.firebaseio.com",
    projectId: "alpha-f1c44",
    storageBucket: "alpha-f1c44.appspot.com",
    messagingSenderId: "1090009710779"
  }; 

  const cloudSettings: CloudSettings = {
    'core': {
      'app_id': 'APP_ID'
    }
  };


@NgModule({
  declarations: [
    MyApp,
    MembersPage,
    ListPage,
    ExecutivePage,
    AlumniPage,
    PledgesPage,
    InfoPage,
    AddMembersPage,
    AddPledgesPage,
    PhotolibPage,
    EventsPage,
    AddEventsPage,
    EditInfoPage,
    AlumnInfoPage,
    AlumnEditInfoPage,
    AddAlumniPage,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    IonicImageViewerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MembersPage,
    ListPage,
    ExecutivePage,
    AlumniPage,
    PledgesPage,
    InfoPage,
    AddMembersPage,
    AddPledgesPage,
    PhotolibPage,
    EventsPage,
    AddEventsPage,
    EditInfoPage,
    AlumnInfoPage,
    AlumnEditInfoPage,
    AddAlumniPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    PhotoLibrary,
    File,
    FileTransfer,
    FileTransferObject,
    Clipboard,
    Crop,
    WheelSelector,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
