import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GetserviceService } from './getservice.service';
@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  listeC = [];
  ele: any;

  constructor( private list: GetserviceService ) {}
  get( email: string) {
    console.log(this.list.get());
    this.list.get().forEach(el => {
      if ( el.email === email ) {
        this.ele = el;
      }
    });
    return this.ele;
  }
}
