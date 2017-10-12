import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEventsPage } from './add-events';
import { WheelSelector } from '@ionic-native/wheel-selector';

@NgModule({
  declarations: [
    AddEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEventsPage),
  ],
  exports: [
    AddEventsPage
  ]
})
export class AddEventsPageModule {}
