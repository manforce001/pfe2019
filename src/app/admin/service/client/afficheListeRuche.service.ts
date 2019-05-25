import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class AfficheListeRucheService {
  subject = new Subject<number>();

  list: AngularFireList<any>;
  Listearray = [];
  x = 0;
  constructor( private db: AngularFireDatabase , private http: HttpClient) {
    this.list =  this.db.list('clients/');
   }
   emitieListe() {
    this.subject.next(this.x);
  }
  getid( id: string) {

    this.list =  this.db.list('clients/'+id+'/ruches/');
    this.list.snapshotChanges().subscribe(action => {action.forEach ( action => {
        this.x ++;
        this.emitieListe();
      });
    });
    return this.x;
  }

}
