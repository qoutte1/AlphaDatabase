import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseService {

    constructor(public afd: AngularFireDatabase) { }

    getMembers(){
        return this.afd.list('/members/');
    }

    addMembers(name){
        return this.afd.list('/members/').push(name);
    }

    removeMembers(id){
        return this.afd.list('/members/').remove(id);
        
    }
}