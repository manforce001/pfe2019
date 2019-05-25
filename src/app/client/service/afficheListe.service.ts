import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class AfficheListeService {
  list: AngularFireList<any>;
  Listearray = [];
  constructor( private db: AngularFireDatabase) {
    this.list = db.list('clients/');
  }
  get() {
    this.list.snapshotChanges().subscribe(action => {action.forEach ( action => {
      let y = action.payload.toJSON();
      y['$key'] = action.key;
      this.Listearray.push(y);
      });
    });
    return this.Listearray;
  }
}
