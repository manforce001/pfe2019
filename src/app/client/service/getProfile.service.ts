import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AfficheListeService } from '../../admin/service/client/afficheListe.service';
@Injectable({
  providedIn: 'root'
})
export class GetProfileService {
  listeC = [];
  ele: any;

  constructor( private list: AfficheListeService ) {}

  get( email: string) {

  this.listeC = this.list.get();
  this.listeC.forEach(el => {
    if ( el.email === email ) {
      this.ele = el;
    }
    });
  return this.ele;
  }
}
