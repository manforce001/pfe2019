import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { AfficheListeService } from '../../../service/employee/afficheListe.service';

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
    cin: '',
    mdp: '',
    tel: '',
    ville: '',
    gouvernerat: '',
  };
  listeC = [];
  listeClient = [];
  nomRech: string;


  constructor( private route: ActivatedRoute ,
               private router: Router,
               private liste: AfficheListeService ) {}
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
  ngOnInit() {

  }


}
