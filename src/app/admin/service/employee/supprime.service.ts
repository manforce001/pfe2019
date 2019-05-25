import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class SupprimeService {

  constructor() {

   }
   delete(id: any) {

    let adaRef = firebase.database().ref('employe/');
    adaRef.child(id).remove()
      .then(function() {
        console.log('"Remove succeeded."');
      })
      .catch(function(error) {
        console.log('"Remove failed: "' + error.message);
      });






   }

}
