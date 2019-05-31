import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { AfficheListeService } from '../../../service/employee/afficheListe.service';
import { SupprimeService } from '../../../service/employee/supprime.service';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-RechME',
  templateUrl: './RechME.component.html',
  styleUrls: ['./RechME.component.css']
})
export class RechMEComponent implements OnInit {
  bv = true;
  bs = false;
  listeResultat = false;
  data = {
    email: '',
    nom: '',
    prenom: '',
    adresse: '',
   cin: '',
    pwd: '',
  };
  listeC = [];
  listeClient = [];
  nomRech: string;

  listeEmploye = [];
  listeE;
  dblisteE;

  verif() {
    this.getListe();

    this.bv = !(this.bv);
    this.bs = !(this.bs);
  }

  constructor( private route: ActivatedRoute ,
               private router: Router,
               private liste: AfficheListeService,
               private db: AngularFireDatabase,
               private removeSer: SupprimeService ) {
                this.dblisteE = db.list('/employe');
  }
  getListe() {
    this.listeClient.pop();
    this.listeResultat = false;
    this.getListeE();
    for (let e of this.listeE){
      if ((e.nom.indexOf(this.nomRech) > -1)
          || (this.nomRech.indexOf(e.nom) > -1)
          || (e.prenom.indexOf(this.nomRech) > -1)
          || (this.nomRech.indexOf(e.prenom) > -1)) {
            if(this.notexiste(e.cin))
             { this.listeClient.push(e);}
      }
    }
    if ( this.listeClient.length > 0) {
      this.listeResultat = true;
    }

  }
  notexiste(a) {
    let v = true;
    for(let key of this.listeClient) {
      if (key.cin === a) { v = false; }
    }
    return v;
  }
  rech() {
    this.getListe();
  }

  //--------------------------------------------
  getListeE () {
    this.dblisteE.valueChanges().subscribe(firebaseData => { this.listeE = firebaseData; });
    console.log(this.listeE);

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

  }
  existe( e,t) {
    for(let  k of t) {
      if(k.cin === e.cin) {
        return true;
      }
    }
    return false;
  }
  ngOnInit() {
    this.getListeE();
    this.getListeEmpl();
  }

valide( data: any) {

    this.router.navigate(['/admin/ModifierEmploye'], {
      queryParams: {
        email: data.email,
        nom: data.nom,
        prenom: data.prenom,
        cin: data.cin,
        mdp: data.mdp,
        ville: data.ville,
        gouvernerat: data.gouvernerat,
        tel: data.tel
      } });
  }
}
