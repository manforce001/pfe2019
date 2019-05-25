import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { EmployeForm } from '../../employeForm';
import { AfficheListeService } from '../afficheListe.service';


@Injectable({
  providedIn: 'root'
})
export class RechPlaceService {
listeGouv = [];
listeNom: EmployeForm [];

constructor( private liste: AfficheListeService ) {
  liste.get();
 }
 getGouv( place: string) {
  const a = this.liste.get();

  this.listeGouv.pop();
  for (let key of a ){
    if ((key.gouvernerat === place) && ( this.listeGouv.indexOf(key) < 0)) {
      this.listeGouv.push(key);
    }
  }
  console.log(this.listeGouv);
  return this.listeGouv;
 }
 getNom( nom: string) {
  const a = this.liste.get();
  this.listeNom.pop();
  for (let key of a ){
    if ((key.nom === nom) && ( this.listeNom.indexOf(key) < 0)) {
      this.listeNom.push(key);
    }
  }
  return this.listeNom;
 }

}
