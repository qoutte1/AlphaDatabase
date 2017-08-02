import { Component} from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'my-pop-over.html'
})
export class MyPopoverPage {
  constructor(public viewCtrl: ViewController) {}

  memberAdd(item){

  }

  close() {
    this.viewCtrl.dismiss();
  }
}