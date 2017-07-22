import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEventsPage } from './add-events';

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
