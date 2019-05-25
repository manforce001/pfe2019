import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModifProfileService {

  constructor( private httpClient: HttpClient) { }

  ajoute( data: any )  {
    this.httpClient.put('https://smart-ruche.firebaseio.com/clients/' + data.cin + '.json', data);
  }
}
