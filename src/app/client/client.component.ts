import { Component, OnInit , ViewChild } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { GetProfileService } from './service/getProfile.service';
import { ListeNotificationService} from './service/ListeNotification.service';
import * as $ from 'jquery';
import * as firebase from 'firebase';
import { RemoveNotifService} from './service/removeNotif.service';
import { AddAlertService } from './service/AddAlertService.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  alert =
   {
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
  constructor(private router: Router,
              private route: ActivatedRoute ,
              private ListeSer: GetProfileService,
              private ListeNotif: ListeNotificationService,
              private RemoveNotif: RemoveNotifService,
              private AddAlert: AddAlertService
              ) {
    route.queryParams.subscribe(params => {
    this.email = params.email;
    });
    this.profile = ListeSer.get(this.email);

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
                     this.ruches[this.indexRuche.indexOf(this.idRucheAlert)].empres);
  }
  affiche( ruche: any, id: any) {

    this.NombreNotification = this.ListeNotif.gets(this.profile.cin).length;
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
    if ((ta[3] as number) < (tb[3] as number) || (ta[3] as number) === (tb[3] as number)) {
      if ((ta[2] as number) < (tb[2] as number) || (ta[2] as number) === (tb[2] as number)) {
        if ((ta[1] as number) < (tb[1] as number) || (ta[1] as number) === (tb[1] as number)) {
          if (((ta[0].split(':')[0] as number) < (tb[0].split(':')[0] as number)) ||
           ((ta[0].split(':')[0] as number) === (tb[0].split(':')[0] as number))) {
            if (((ta[0].split(':')[1] as number) < (tb[0].split(':')[1] as number)) ||
             ((ta[0].split(':')[1] as number) === (tb[0].split(':')[1] as number))) {
              return true;
            } else { return false; }
          } else { return false; }
        } else { return false; }
      } else { return false; }
    } else { return false; }
  }
  remove( id: any, n, idr) {
    this.notificationSs[n] = true;
    //this.RemoveNotif.delete(this.profile.cin, id);
    this.RemoveNotif.moveToHistorique(id, this.profile.cin, idr);
  }
}
