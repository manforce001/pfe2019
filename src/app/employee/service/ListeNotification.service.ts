import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ListeNotificationService {
  data = {
    employee: '',
    description: '',
    resultat: '',
    rucheid: '',
    date: ''
  };
  Subject = new Subject<any[]>();
  list: any;
  Listearray = [];
  emitSubject() {
    this.Subject.next(this.list);
  }
  constructor(  private httpClient: HttpClient) {}
  gets(cin: any) {
    this.httpClient
      .get<any[]>('https://smart-ruche.firebaseio.com/notificationE/' + cin + '.json')
      .subscribe(
        (response) => {

          this.list = response;
          this.emitSubject();
        },
        (error) => {
          return [];
        }
      );
    return this.list;
  }
  removeNotification(idNotification: any, cinEmp: any) {
    let adaRef = firebase.database().ref('notificationE/');
    adaRef.child(cinEmp).child(idNotification).remove()
      .then(function() {
        console.log('"Remove succeeded."');
      })
      .catch(function(error) {
        console.log('"Remove failed: "' + error.message);
      });
  }
  reponde(dicription: any, cinClient: any, cinTech: any, res: any, rucheid: any) {
    const d: Date = new Date();
    const date = d.getHours() + ':' + d.getMinutes() + '-' + d.getDay() + '-' + d.getMonth() + '-'+ d.getFullYear();
    this.data.employee = cinTech;
    this.data.description = dicription;
    this.data.resultat = res;
    this.data.rucheid = rucheid;
    this.data.date = date;
    this.httpClient.put('https://smart-ruche.firebaseio.com/notificationC/' + cinClient + '/' + date + '.json', this.data).subscribe(
      (response) => {
        console.log('valider');
      },
      (error) => {
        console.log('error!! :'+ error);
      }
    );
  }
  moveToHistorique(idNotification: any, cinEmp: any, ) {
    this.httpClient.get<any[]>('https://smart-ruche.firebaseio.com/notificationE/' + cinEmp + '/' + idNotification +'.json')
    .subscribe(
      (response) => {
        console.log('get H valider');
        this.httpClient.put('https://smart-ruche.firebaseio.com/employe/' + cinEmp + '/historique/' + idNotification + '.json', response).subscribe(
        (response) => {
          console.log('put H valider');
          this.removeNotification(idNotification, cinEmp);
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

