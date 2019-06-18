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
  listeregion = [
    {'id': "Ariana", 'liste': ["Ariana Ville", "Ettadhamen","Kalâat el-Andalous","Soukra","Mnihla","Raoued","Sidi Thabet"]},
    {'id': "Béja", 'liste': ["Amdoun", "Béja Nord", "Béja Sud", "Goubellat", "Medjez el-Bab", "Nefza", "Téboursouk", "Testour", "Thibar"]},
    {'id': "Ben Arous", 'liste': ["Ben Arous", "Radès", "Mornag", "Mégrine", "Medina Jedida", "Mohamedia", "Hammam Lif", "Hammam Chott", "Fouchana", "Ezzahra", "El Mourouj", "Bou Mhel el-Bassatine"]},
    {'id': "Bizerte", 'liste': ["Bizerte Nord", "Bizerte Sud", "El Alia", "Ghar El Melh", "Ghezala", "Joumine", "Mateur", "Menzel Bourguiba", "Menzel Jemil", "Ras Jebel", "Sejnane", "Tinja", "Utique", "Zarzouna"]},
    {'id': "Gabès", 'liste': ["xxxx", "wwww"]},
    {'id': "Gafsa", 'liste': ["xxxx", "wwww"]},
    {'id': "Jendouba", 'liste': ["xxxx", "wwww"]},
    {'id': "Kairouan", 'liste': ["xxxx", "wwww"]},
    {'id': "Kasserine", 'liste': ["xxxx", "wwww"]},
    {'id': "Kébili", 'liste': ["xxxx", "wwww"]},
    {'id': "Le Kef", 'liste': ["xxxx", "wwww"]},
    {'id': "Mahdia", 'liste': ["xxxx", "wwww"]},
    {'id': "Manouba", 'liste': ["xxxx", "wwww"]},
    {'id': "Médenine", 'liste': ["xxxx", "wwww"]},
    {'id': "Monastir", 'liste': ["xxxx", "wwww"]},
    {'id': "Nabeul", 'liste': ["xxxx", "wwww"]},
    {'id': "Sfax", 'liste': ["xxxx", "wwww"]},
    {'id': "Sidi Bouzid", 'liste': ["xxxx", "wwww"]},
    {'id': "Siliana", 'liste': ["xxxx", "wwww"]},
    {'id': "Sousse", 'liste': ["xxxx", "wwww"]},
    {'id': "Tataouine", 'liste': ["xxxx", "wwww"]},
    {'id': "Tozeur", 'liste': ["xxxx", "wwww"]},
    {'id': "Tunis", 'liste': ["xxxx", "wwww"]},
    {'id': "Zaghouan", 'liste': ["xxxx", "wwww"]},

  ];
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
  ListeRegion: any;
  date: any = 'tout';
  region: any = 'tout';
  gouv: any = 'tout';
  ToutRuche = [];
  ToutRucheT = [];
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
    while(this.listeEmploye.length > 0 ){
      this.listeEmploye.pop();
    }
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
    this.ToutRuche = this.getDonnees();
    window.console.clear();
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
  }
  getDonnees(){
    this.getListeClient();
    let tabRuche = [];
    for (let key of  this.listeClient) {
      for (let keyy in key.ruches) {
        if (key.ruches.hasOwnProperty(keyy)) {
          tabRuche.push(key.ruches[keyy]);
        }
      }
    }

    return tabRuche;
  }
  dateStat(value){
    this.date = value;

  }
  gouvStat(value) {
    this.gouv = value;
    if (value !== 'tout') {
       this.listeregion.forEach(element => {
          if (element["id"] === value) {
            this.ListeRegion = element["liste"];
          }
       });
    }
  }
  regionStat(value) {
    this.region = value;
  }
  afficheStat() {
    this.ToutRucheT = this.ToutRuche;
    if (this.gouv !== 'tout') {
      let tab = [];
      for (let k of this.ToutRucheT){
        if (k.gouvernerat === this.gouv) {
          tab.push(k);
        }
      }
      while (this.ToutRucheT.length > 0) { this.ToutRucheT.pop(); }
      this.ToutRucheT = tab;
      if (this.region !== 'tout') {
        let tab = [];
        for (let k of this.ToutRucheT) {
          if (k.ville === this.region) {
            tab.push(k);
          }
        }
        while (this.ToutRucheT.length > 0) { this.ToutRucheT.pop(); }
        this.ToutRucheT = tab;
      }
    }

  }

}
