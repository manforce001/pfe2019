import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { EmployeForm } from '../employeForm';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AfficheListeService {
  Listearray = [];
  constructor(  private httpClient: HttpClient) {}
  get() {
    let array =[];
    this.Listearray.pop();
    this.httpClient.get<any[]>('https://smart-ruche.firebaseio.com/employe.json').subscribe(
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
