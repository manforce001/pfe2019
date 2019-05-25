import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class AfficheListeService {
  Subject = new Subject<any[]>();
  list: any;
  Listearray = [];
  emitSubject() {
    this.Subject.next(this.list);
  }
  constructor(  private httpClient: HttpClient) {}
  get() {

    this.httpClient.get<any[]>('https://smart-ruche.firebaseio.com/clients.json').subscribe(
      (response) => {
        this.Listearray.pop();
        for( let key in response) {
          if(response.hasOwnProperty(key)){
            this.Listearray.push(response[key]);
          }
        }
      },
      (error) => {
        console.log('get H error!! :'+ error);
      });
      return this.Listearray;
  }
}
