import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router , NavigationExtras } from '@angular/router';
import * as firebase from 'firebase';
import { AfficheListeService } from './service/client/afficheListe.service';
import { AfficheListeService as Listeser } from './service/employee/afficheListe.service';
import { GetSetListeService } from './service/employee/recherche/getSetListe.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  donnees = [{
    gouv:'',
    region: [{
      region: '',
      donnes:[],
      temps:[]
    }]
  }]
  AjouteR: string;
  SuppC: string;
  listeClient = [];
  listeC;
  dblisteC;
  listeEmploye = [];
  listeE;
  dblisteE;
  ar = true;
  sc = true;
  me = true;
  se = true;
  date: any = 'tout';
  region: any = 'tout';
  gouv: any = 'tout';
  rechercheAR() {
      this.ar = !( this.ar );
      this.sc = true;
      this.me = true;
      this.se = true;
    }
  rechercheSC() {
    this.sc = !( this.sc );
    this.ar = true;
    this.me = true;
    this.se = true;
  }
  rechercheME() {
    this.me = !( this.me );
    this.sc = true;
    this.ar = true;
    this.se = true;
  }
  rechercheSE() {
    this.se = !( this.se );
    this.sc = true;
    this.me = true;
    this.ar = true;
  }
  getListeClient() {
    this.getListeC();
    this.listeC.forEach(element => {
      if(!this.existe(element, this.listeClient)) {
        this.listeClient.push(element);
        }
    });

  }
  getListeE () {
    this.dblisteE.valueChanges().subscribe(firebaseData => {
      this.listeE = firebaseData;
    });
   }
   getListeC(){
    this.dblisteC.valueChanges().subscribe(firebaseData => {
      this.listeC = firebaseData;
    });
   }
  getListeEmpl() {
    this.listeEmploye.pop();
    this.getListeE();
    for(let k in this.listeE)
    {
      if (this.listeE.hasOwnProperty(k)) {
        if(!this.existe(this.listeE[k],this.listeEmploye)) {
        this.listeEmploye.push(this.listeE[k]);
        }
      }
    }
    this.xx.set( this.listeEmploye);
  }
  existe( e,t) {
    for(let  k of t) {
      if(k.cin === e.cin) {
        return true;
      }
    }
    return false;
  }
  NombreRuche(ruches) {
    let nbr = 0;
    for( let key in ruches){
      if (ruches.hasOwnProperty(key)){
        if(ruches[key]!= null)
        nbr++;
      }
    }
    return nbr;
  }
  constructor( private route: Router,
               private ListC: AfficheListeService,
               private ListE: Listeser,
               private db: AngularFireDatabase,
               private xx: GetSetListeService) {
                this.dblisteE = db.list('/employe');
                this.dblisteC = db.list('/clients');
               }

  ngOnInit() {
    this.getListeE();
    this.getListeC();
    this.getListeEmpl() ;
    this.getListeClient() ;
  }
  rechAR() {
      this.route.navigate(['/admin/ListAjouteRuche'], {
      queryParams: {
        nom: this.AjouteR
      } });
  }
  rechSC() {

   this.route.navigate(['/admin/ListSupprimerClient'], {
    queryParams: {
      nom: this.SuppC
    } });
  }/*
  getDonnees(){
    this.getListeClient();
    this.donnees = [];
     for(let key of  this.listeClient) {
       for(let keyy in key.ruches){
         if(key.ruches.hasOwnProperty(keyy)){
          this.donnees[0].region
           for(let keyyy in key.ruches[keyy].donnees){
            if(key.ruches[keyy].donnees.hasOwnProperty(keyyy)){

            }
           }
         }
       }
     }

    return;
  }
  dateStat(value){
    this.date = value;
  }
  gouvStat(value){
    this.gouv = value;
  }
  regionStat(value){
    this.region = value;
  }
  afficheStat(){

  }*/

}
