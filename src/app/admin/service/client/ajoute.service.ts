import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AjouteService {
  donnees = {
    poid: '0',
    humidite: '0',
    temperature: '0',
  };
constructor( private httpClient: HttpClient) { }
ajoute( data: any , ruche: any )  {
  let action ={
    action: 'start',
    date: ruche.dateLancement,
    detail: 'votre ruche est activée '
    };
  this.httpClient.put('https://smart-ruche.firebaseio.com/clients/' + data.cin + '.json', data).subscribe(
      () => {
        this.httpClient.put('https://smart-ruche.firebaseio.com/clients/' + data.cin + '/ruches/1.json', ruche).subscribe(
          () => {
            this.httpClient.put('https://smart-ruche.firebaseio.com/clients/' + data.cin + '/ruches/1/donnees/'+ruche.dateLancement+'.json', this.donnees).subscribe(
              () => {
                this.httpClient.put('https://smart-ruche.firebaseio.com/clients/' + data.cin + '/ruches/1/historique/'+ruche.dateLancement+'.json', action).subscribe(
                  () => {
                    this.ajouteAuth(data.email, data.mdp);
                  },
                  (error) => {
                    console.log('Erreur ! : ' + error);
                  }
                );
              },
              (error) => {
                console.log('Erreur ! : ' + error);
              }
            );
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
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
