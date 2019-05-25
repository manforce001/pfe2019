import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { EmployeForm } from '../employeForm';



@Injectable({
  providedIn: 'root'
})
export class AfficheUnService {
  objet: EmployeForm = null;
  constructor(private httpClient: HttpClient) { }
  get(id: string) {
    return this.httpClient.get<EmployeForm>('https://smart-ruche.firebaseio.com/employe/'+id+'.json');
  }
}
