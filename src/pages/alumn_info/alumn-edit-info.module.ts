import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnEditInfoPage } from './alumn-edit-info';

@NgModule({
  declarations: [
    AlumnEditInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AlumnEditInfoPage),
  ],
  exports: [
    AlumnEditInfoPage
  ]
})
export class EditInfoPageModule {}
