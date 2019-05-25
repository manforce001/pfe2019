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
  moveToHistorique(idNotification: any, cinEmp: any, id : any ) {
    console.log(idNotification);
    console.log(cinEmp);
    console.log(id);
    this.httpClient.get<any[]>('https://smart-ruche.firebaseio.com/notificationC/' + cinEmp + '/' + idNotification +'.json')
    .subscribe(
      (response) => {
        console.log('get H valider');
        this.httpClient.put('https://smart-ruche.firebaseio.com/clients/' + cinEmp + '/ruches/' + id  + '/historique.json', response).subscribe(
        (response) => {
          console.log('put H valider');
          this.delete(cinEmp, idNotification );
        },
        (error) => {
          console.log('put H error!! :'+ error);
        });

      },
      (error) => {
        console.log('get H error!! :'+ error);
      });
  }
}
