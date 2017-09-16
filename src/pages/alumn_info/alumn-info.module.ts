import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnInfoPage } from './alumn-info';

@NgModule({
  declarations: [
    AlumnInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AlumnInfoPage),
  ],
  exports: [
    AlumnInfoPage
  ]
})
export class InfoPageModule {}
