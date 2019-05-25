import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router , NavigationExtras } from '@angular/router';
import * as firebase from 'firebase';
import { AfficheListeService } from './service/client/afficheListe.service';
import { AfficheListeService as Listeser } from './service/employee/afficheListe.service';
import { GetSetListeService } from './service/employee/recherche/getSetListe.service';

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
  listeEmploye = [];
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
    this.listeClient.pop();
    this.listeClient = this.ListC.get();
  }
  getListeEmpl() {

    this.listeEmploye.pop();
    this.listeEmploye = this.ListE.get();
    this.xx.set( this.listeEmploye);
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
               private xx: GetSetListeService) {}

  ngOnInit() {
    this.getListeEmpl();
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
