import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class GetserviceService {
  Listearray = [];
  Subject = new Subject<any[]>();
  emitSubject() {
    this.Subject.next(this.Listearray);
  }
  constructor(  private httpClient: HttpClient) {}
  get() {
    this.Listearray.pop();
    this.httpClient.get<any[]>('https://smart-ruche.firebaseio.com/employe.json').subscribe(
      (response) => {
        this.Listearray.pop();

        for( let key in response) {
          if(response.hasOwnProperty(key)){
            this.Listearray.push(response[key]);
          }
        }
        this.emitSubject();
      },
      (error) => {
        console.log('get H error!! :'+ error);
      });
      console.log(this.Listearray);
    return this.Listearray;
  }
}
