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

    this.httpClient.put('https://smart-ruche.firebaseio.com/notificationE/' + cinEmp + '/' + date + '.json', this.data).subscribe(
      () => {
        console.log('valider ! : ');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
  );
  }
}
