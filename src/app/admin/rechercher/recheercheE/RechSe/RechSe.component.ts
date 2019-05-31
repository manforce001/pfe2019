import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { AfficheListeService } from '../../../service/employee/afficheListe.service';
import { SupprimeService } from '../../../service/employee/supprime.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-RechSe',
  templateUrl: './RechSe.component.html',
  styleUrls: ['./RechSe.component.css']
})
export class RechSeComponent implements OnInit {
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
  valide( data: any) {
        this.removeSer.delete(data.cin);
        this.router.navigate(['/admin']);
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

}
