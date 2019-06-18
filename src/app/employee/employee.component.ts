import { Component, OnInit  } from '@angular/core';
import { GetProfileService } from './service/getProfile.service';
import * as firebase from 'firebase';
import { ActivatedRoute , Router } from '@angular/router';
import { ListeNotificationService} from './service/ListeNotification.service';
import { environment } from '../../environments/environment';
import { GetserviceService } from './service/getservice.service';
import { ProfileService } from '../profile.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit  {
  email: string;
  profile: any;
  NotificationViewListe = true;
  arrayIndexNotif = [];
  notifications= [];
  NotificationReponde;
  dicriptionNotificationReponde;
  resultatNotificationReponde;
  listeClient = [];
  listeC;
  dblisteC;
  client;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private ListeSer: GetProfileService,
              private ListeNotif: ListeNotificationService,
              private getliste: GetserviceService,
              private db: AngularFireDatabase,
              private getprofile: ProfileService) {
                firebase.initializeApp(environment.firebase, 'empFire');

                route.queryParams.subscribe(params => {
                  this.email = params.email;
                });
                this.profile = getprofile.get();
                this.ListeNotif.gets(this.profile.cin);
                this.dblisteC = db.list('/clients');
                this.getListeC();

 }
 afficheClient(cl){
  let item = {
    cin: '',
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    nbrRuche: '',
    nbrRucheRes: '',
  };
  item.cin = cl.clientcin;
  item.nom = cl.nom;
  item.prenom = cl.prenom;
  item.adresse = cl.adress;
  item.tel = cl.tel;
  item.nbrRuche = cl.nbrr;
  item.nbrRucheRes = cl.ruches.length;
  this.client = item;
 }
 getListeC(){
  this.dblisteC.valueChanges().subscribe(firebaseData => {
    this.listeC = firebaseData;
    while (this.listeClient.length > 0 ) {
      this.listeClient.pop();
    }
    if (!(this.listeC === undefined)) {
      for (let k of this.listeC) {
        if ((this.getIdClient(k).verif)) {
          this.listeClient.push(this.getIdClient(k).elm);
        }
      }
    }

  });
 }
 afficheNotification() {
    const array = [];
    array.pop();
    let nx = this.ListeNotif.gets(this.profile.cin);
    for (let n in nx){
      array.push(nx[n]);
      if( this.arrayIndexNotif.indexOf(n) < 0) { this.arrayIndexNotif.push(n);}
    }
    this.NotificationViewListe = false;
    this.notifications.pop();
    this.notifications = array;
  }
  getNotif(notification) {
    this.NotificationReponde = notification;
  }
  NotificationRepondeResultat(choix) {
    this.resultatNotificationReponde = choix;
  }
  reponde() {
    this.ListeNotif.reponde(this.dicriptionNotificationReponde,
                            this.NotificationReponde.client,
                            this.profile.cin,
                            this.resultatNotificationReponde,
                            this.NotificationReponde.rucheid);
    this.ListeNotif.moveToHistorique(this.NotificationReponde.date, this.profile.cin);
  }
  Deconnexion() {
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }
  ngOnInit() {
    this.getListeC();
    if (!(this.listeC === undefined)) {
      for (let k of this.listeC) {
        if ((this.getIdClient(k).verif)) {
          this.listeClient.push(this.getIdClient(k).elm);
        }
      }
    }
    window.console.clear();
  }
  getIdClient(client) {
    let array = {
      clientcin: '',
      nom: '',
      prenom: '',
      adress: '',
      tel: '',
      nbrr:'',
      ruches :[]
    };

    let v = false;
    let ruche = this.getListeRuche(client);
    for ( let k of ruche) {
      if( k.cinEmplRes === this.profile.cin) {
        v = true;
        let item = {
          status: true,
          nbrP: '',
          datelancement: '',
          ville: '',
          gouv: '',
          listePro: []
        };
        item.status = this.getStatus(k.historique);
        item.nbrP = (this.getListePrb(k.historique).length).toString();
        item.datelancement = k.dateLancement;
        item.ville = k.ville;
        item.gouv = k.gouvernerat;
        item.listePro = this.getListePrb(k.historique);
        array.ruches.push(item);
      }
    }
    if (v) {
      array.tel = client.tel;
      array.adress = client.adresse;
      array.nom = client.nom;
      array.prenom = client.prenom;
      array.clientcin = client.cin;
      array.nbrr =( ruche.length).toString();
    }
    return { verif : v, elm: array};
  }
  getListeRuche (client) {
    let array = [];
    for (let k in client.ruches) {
      if(client.ruches.hasOwnProperty(k)) {
        array.push(client.ruches[k]);
      }
    }
    return array;
  }
  getStatus (historique) {
    let array =[];
    let temps = [];
    for (let k in historique){
      if(historique.hasOwnProperty(k)) {
         array.push(historique[k]);
         temps.push(k);
      }
    }

    let a = this.trie(array,temps);
    return a [a.length - 1 ].action === 'Probleme';
  }
  getListePrb(historique){
    let array = [];
    for(let k in historique){
      if(historique.hasOwnProperty(k)){
        if (historique[k].action === 'Probleme') {
         array.push(historique[k]);
        }
      }
    }
    return array;
  }
  trie (t,temps) {
    let tab_en_ordre = false;
    let taille = t.length;
    while ( !tab_en_ordre ) {
      tab_en_ordre = true;
      for (let i = 0 ; i < taille - 1 ; i++) {
          if (this.inf(temps[i], temps[i + 1])) {
            let axt = temps[i];
            let ad = t[i];
            temps[i] = temps[i + 1];
            t[i] = t[i + 1];
            temps[i + 1] = axt;
            t[i + 1] = ad;
            tab_en_ordre = false;
          }

      }
      taille--;
    }
    return t;
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
}
