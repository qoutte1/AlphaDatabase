import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPledgesPage } from './add-pledges';

@NgModule({
  declarations: [
    AddPledgesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPledgesPage),
  ],
  exports: [
    AddPledgesPage
  ]
})
export class AddPledgesPageModule {}
