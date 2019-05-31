import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddAlertService {
  data = {
    client: '',
    date: '',
    discription: '',
    type: '',
    rucheid: ''
  };
  constructor( private httpClient: HttpClient) {}
  add (dd: any, id: any, cin: any, cinEmp: any) {
    let d: Date = new Date();
    let date = d.getHours()+':'+d.getMinutes()+'-'+d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear();

    this.data.client = cin;
    this.data.date = date;
    this.data.discription = dd;
    this.data.type = 'urgent';
    this.data.rucheid = id;
    let item = {
      action: '',
      date: '',
      detail: '',
    };
    item.action = 'Probleme';
    item.date = date;
    item.detail = dd;
    this.httpClient.put('https://smart-ruche.firebaseio.com/notificationE/' + cinEmp + '/' + date + '.json', this.data).subscribe(
      () => {
        console.log('valider ! : ');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      });
    this.httpClient.put('https://smart-ruche.firebaseio.com/clients/' + cin + '/ruches/' + id  + '/historique/'+date+'.json', item).subscribe(
      (response) => {
        console.log('put H valider');
      },
      (error) => {
        console.log('put H error!! :'+ error);
      });
  }
}
