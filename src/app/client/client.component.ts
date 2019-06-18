import { Component, OnInit , ViewChild } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { GetProfileService } from './service/getProfile.service';
import { ListeNotificationService} from './service/ListeNotification.service';
import * as $ from 'jquery';
import * as firebase from 'firebase';
import { RemoveNotifService} from './service/removeNotif.service';
import { AddAlertService } from './service/AddAlertService.service';
import { ProfileService } from '../profile.service'
import { from } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  alert = {
    cin: '',
    ruche: '',
    dis: '',
    date: '',
    type: '',
  };
  email: string;
  profile: any;
  listeR = [];
  ruches = [];
  tabBORD: any;
  indexRuche = [];
  idRuche: number;
  NomberRuche: number;
  NombreNotification = 0;
  NotificationViewListe = true;
  arrayIndexNotif = [];
  notifications = [];
  notificationSs = [];
  discription: any;
  idRucheAlert: any;
  actualiserdb;
  constructor(private router: Router,
              private route: ActivatedRoute ,
              private ListeSer: ProfileService,
              private ListeNotif: ListeNotificationService,
              private RemoveNotif: RemoveNotifService,
              private AddAlert: AddAlertService,
              private db: AngularFireDatabase,
              ) {
    route.queryParams.subscribe(params => {
    this.email = params.email;
    });
    this.profile = ListeSer.get();
    this.actualiserdb = db.list('/clients/' + this.profile.cin + '/ruches');

    this.NomberRuche = 0;
    for (let key in this.listeRuche(this.profile)) {
      if (this.listeRuche(this.profile).hasOwnProperty(key)) {
        if(this.listeRuche(this.profile)[key] != null)
        { this.ruches.push(this.listeRuche(this.profile)[key]);
          this.indexRuche.push(key);
          this.NomberRuche ++;
        }
      }
    }
    $(document).ready( function() {
    $("#ListeSideBarRuche div:first").addClass("active");
    });
    this.tabBORD = this.ruches['0'];
    this.idRuche = this.indexRuche[0];
  }
  listeRuche( profile: any) {
    return profile.ruches;
  }
  afficheNotification() {
    this.notifications.pop();
    this.arrayIndexNotif.pop();
    this.notificationSs.pop();
    let nf =  this.ListeNotif.gets(this.profile.cin);
    for (let n in nf ) {
      if(this.notifications.indexOf(nf[n])<0)
      {this.notificationSs.push(false);
      this.arrayIndexNotif.push(n);
      this.notifications.push(nf[n]);}
    }
  }
  Deconnexion() {
    firebase.auth().signOut();
    this.router.navigate(['/']);

  }
  pageModification() {
    this.router.navigate(['/client/modifier'], {
      queryParams: {
        email: this.profile.email,
        nom: this.profile.nom,
        prenom: this.profile.prenom,
        cin: this.profile.cin,
        adresse: this.profile.adresse,
        mdp: this.profile.mdp,
        tel: this.profile.tel,
      } });

  }
  AlertListRuche(ruche: any){
    this.idRucheAlert = ruche;
  }
  Alert() {
    this.AddAlert.add(this.discription, this.idRucheAlert, this.profile.cin ,
                     this.ruches[this.indexRuche.indexOf(this.idRucheAlert)].cinEmplRes);
  }
  affiche( ruche: any, id: any) {

    this.tabBORD = ruche;
    this.idRuche = id ;
  }
  afficheIndex( id: any ) {
    $("#ListeSideBarRucheItem ").click(function () {
      $("#ListeSideBarRucheItem div").removeClass("active");
      $(this).children("div").addClass("active");
    });
    return ((id as number) + 1);
  }
  ngOnInit() {
    this.ListeNotif.gets(this.profile.cin);
    window.console.clear();
  }
  trieDonnees(ruche: any) {
    let objet = {
      temps : [],
      donnees: []
    };
    for (let key in ruche.donnees) {
      if ((ruche.donnees.hasOwnProperty(key))) {
        objet.donnees.push(ruche.donnees[key]);
        objet.temps.push(key);
      }
    }
    let tab_en_ordre = false;
    let taille = objet.temps.length;
    while ( !tab_en_ordre ) {
      tab_en_ordre = true;
      for (let i = 0 ; i < taille - 1 ; i++) {
          if (this.inf(objet.temps[i], objet.temps[i + 1])) {
            let axt = objet.temps[i];
            let ad = objet.donnees[i];
            objet.temps[i] = objet.temps[i + 1];
            objet.donnees[i] = objet.donnees[i + 1];
            objet.temps[i + 1] = axt;
            objet.donnees[i + 1] = ad;
            tab_en_ordre = false;
          }

      }
      taille--;
    }
    return objet;
  }
  inf(a: any , b: any) {
    //a<b
    let v = false;
    let ta = a.split('-');
    let tb = b.split('-');
    if (Number(ta[3]) === Number(tb[3])) {
      if (Number(ta[2]) === Number(tb[2])) {
        if (Number(ta[1]) === Number(tb[1])) {
          if (Number(ta[0].split(':')[0]) === Number(tb[0].split(':')[0])) {
            if (Number(ta[0].split(':')[1]) === Number(tb[0].split(':')[1])) {
              return true;
            } else { return (Number(ta[0].split(':')[1]) < Number(tb[0].split(':')[1])); }
          } else { return (Number(ta[0].split(':')[0]) < Number(tb[0].split(':')[0])); }
        } else { return Number(ta[1]) < Number(tb[1]); }
      } else { return Number(ta[2]) < Number(tb[2]); }
    } else { return Number(ta[3]) < Number(tb[3]); }
  }
  remove( id: any, n, idr) {
    this.notificationSs[n] = true;
    this.RemoveNotif.moveToHistorique(id, this.profile.cin, idr);
  }
  getHistorique(ruche: any) {
    let objet = ruche.historique;
    let array = [];
    for(let k in objet) {
      if(objet.hasOwnProperty(k)){
        array.push(objet[k]);
      }
    }
    let tab_en_ordre = false;
    let taille = array.length;
    while ( !tab_en_ordre ) {
      tab_en_ordre = true;
      for (let i = 0 ; i < taille - 1 ; i++) {
          if (this.inf(array[i].date, array[i + 1].date)) {
            let axt =array[i];
            array[i] = array[i + 1];
            array[i + 1] = axt;
            tab_en_ordre = false;
          }
      }
      taille--;
    }
    return array.reverse();
  }
  Activer(ruche) {
    let date = new Date();
    let dNow = date.getHours() + ":" + date.getMinutes() + "-" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    let verif = {
      active : false,
      ilya: 0,
      unst: false
    };
    if (ruche.active !== undefined) {
      verif.unst = true;
      if (this.verife(ruche.active, dNow) < 15) {
        verif.active = true;
      } else {
        verif.ilya = this.verife(ruche.active, dNow);
      }
    }
    return verif;
  }
  verife(a , n) {
    const ta = a.split('-');
    const houra = ta[0].split(':');
    const tb = n.split('-');
    const hourb = tb[0].split(':');
    const NumA = ( (Number(houra[0]) * 60) + (Number(houra[1])) + (Number(ta[1]) * 60 * 24));
    const NumN = ( (Number(hourb[0]) * 60) + (Number(hourb[1])) + (Number(tb[1]) * 60 * 24));
    return NumN - NumA;
  }
  actualiser() {
    this.actualiserdb.valueChanges().subscribe(firebaseData => {
      this.ruches = firebaseData;
    });
    $(document).ready( function() {
      $("#ListeSideBarRuche div:first").addClass("active");
    });
    this.tabBORD = this.ruches['0'];
    this.idRuche = this.indexRuche[0];
  }

}
