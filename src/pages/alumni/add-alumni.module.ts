import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAlumniPage } from './add-alumni';

@NgModule({
  declarations: [
    AddAlumniPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAlumniPage),
  ],
  exports: [
    AddAlumniPage
  ]
})
export class AddAlumniPageModule {}
