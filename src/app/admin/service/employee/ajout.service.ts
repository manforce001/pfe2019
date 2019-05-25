import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AjouteService {

constructor( private httpClient: HttpClient) { }
ajoute( data: any )  {
  this.httpClient.put('https://smart-ruche.firebaseio.com/employe/' + data.cin + '.json', data).subscribe(
      () => {
        this.ajouteAuth(data.email, data.mdp);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
  );
}
ajouteAuth(email: string, mot: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, mot).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
}

}
