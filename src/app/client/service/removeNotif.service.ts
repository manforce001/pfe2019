import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemoveNotifService {

constructor( private httpClient: HttpClient ) { }
 delete(cin: any, id: any) {
    let adaRef = firebase.database().ref('notificationC/' + cin + '/');
    adaRef.child(id).remove()
      .then(function() {
        console.log('"Remove succeeded."');
      })
      .catch(function(error) {
        console.log('"Remove failed: "' + error.message);
      });
  }
  moveToHistorique(idNotification: any, cinEmp: any, id : any ){
    this.delete(cinEmp, idNotification );
  }
}
