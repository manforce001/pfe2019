import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { AfficheListeService } from '../../../service/client/afficheListe.service';
import { SupprimeService } from '../../../service/client/supprime.service';

@Component({
  selector: 'app-RechSC',
  templateUrl: './RechSC.component.html',
  styleUrls: ['./RechSC.component.css']
})
export class RechSCComponent implements OnInit {
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

  verif() {
    this.getListe();

    this.bv = !(this.bv);
    this.bs = !(this.bs);
  }

  constructor( private route: ActivatedRoute ,
               private router: Router,
               private liste: AfficheListeService,
               private removeSer: SupprimeService ) {

    this.listeC = this.liste.get();

  }
  getListe() {
    this.listeClient.pop();
    this.listeResultat = false;
    for (let e of this.liste.get()){
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
  ngOnInit() {
    this.getListe();
  }

}
