import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { RouterModule, Routes, Router , NavigationExtras } from '@angular/router';
import { Subject , Observable } from 'rxjs';
import { Client } from '../../../interface/client';
import { AfficheListeService } from '../../service/client/afficheListe.service';





@Component({
  selector: 'app-ajouteclient',
  templateUrl: './ajouteClient.component.html',
  styleUrls: ['./ajouteClient.component.css']
})
export class AjouteClientComponent implements OnInit {

  errorMessage: string ;
  clientarray = [];
  data = {
    email: '',
    nom: '',
    prenom: '',
    cin: '',
    adresse: '',
    mdp: '',
    tel: ''
  };


  constructor(  private route: Router,
                private liste: AfficheListeService) {
    this.clientarray =   this.liste.get();
    this.errorMessage  = '';
  }

  ngOnInit() { }

   test() {
    let test = true;
    this.errorMessage = '';
    let regexpEmail =  new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    let regexpMotp =  new RegExp('^[a-z0-9A-Z._%+-]{8,16}$');
    let regexpNumber =  new RegExp('^[0-9]{8}$');
    let testc = true;
    let testE = true;
    this.liste.get().forEach(e => {
      if (e.cin === this.data.cin) {
        testc = false;
      }
      if (e.email === this.data.email) {
        testE = false;
      }
    });

    if ( !regexpEmail.test(this.data.email)) {
      test = false;
      this.errorMessage = this.errorMessage + 'Email Invalide. ';
    }
    if (!testE) {
      test = false;
      this.errorMessage = this.errorMessage + ' Email existe. ';
    }
    if ( this.data.nom === '') {
      test = false;
      this.errorMessage = this.errorMessage + 'Nom Invalide. ';
    }
    if ( this.data.prenom === '') {
      test = false;
      this.errorMessage = this.errorMessage + 'Prenom Invalide. ';
    }
    if (! regexpMotp.test(this.data.mdp)) {
      test = false;
      this.errorMessage = this.errorMessage + ' Mot de Passe Invalide. ';
    }
    if ( !regexpNumber.test(this.data.cin)) {
      test = false;
      this.errorMessage = this.errorMessage + ' CIN Invalide. ';
    }
    if (!testc) {
      test = false;
      this.errorMessage = this.errorMessage + ' CIN existe. ';
    }
    if (! regexpNumber.test(this.data.tel)) {
      test = false;
      this.errorMessage = this.errorMessage + ' Tel Invalide. ';
    }
    if (this.data. adresse === '') {
      test = false;
      this.errorMessage = this.errorMessage + ' Adresse Invalide. ';
    }
    return test;
  }
  ajouterClient() {
    if (this.test()) {
     this.route.navigate(['/admin/ruche/ajouter'], {
      queryParams: {
        email: this.data.email,
        nom: this.data.nom,
        prenom: this.data.prenom,
        cin: this.data.cin,
        adresse: this.data.adresse,
        mdp: this.data.mdp,
        tel: this.data.tel
      } });
    }
  }
}
