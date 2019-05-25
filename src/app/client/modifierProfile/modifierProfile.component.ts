import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute , Router , RouterModule} from '@angular/router';
import { GetProfileService } from '../service/getProfile.service';
import { SupprimeService } from '../../admin/service/client/supprime.service';
import { ModifProfileService } from '../service/ModifProfile.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-modifierProfile',
  templateUrl: './modifierProfile.component.html',
  styleUrls: ['./modifierProfile.component.css']
})
export class ModifierProfileComponent implements OnInit {
  profile = {
    email: '',
    nom: '',
    prenom: '',
    cin: '',
    adresse: '',
    mdp: '',
    tel: ''
  };
  ProGen: any;
  errorMessage: string ;

  constructor(private ListeSer: GetProfileService,
              private router: Router,
              private route: ActivatedRoute,
              private remSer: SupprimeService,
              private ajSer: ModifProfileService,
              private httpClient: HttpClient ) {
    this.errorMessage  = '';
  }
  Deconnexion() {
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.profile.email = params.email;
      this.profile.nom = params.nom;
      this.profile.prenom = params.prenom;
      this.profile.cin = params.cin;
      this.profile.adresse = params.adresse;
      this.profile.mdp = params.mdp;
      this.profile.tel = params.tel;
    });
    this.ProGen = this.ListeSer.get(this.profile.email);
  }
  test() {
    let test = true;
    this.errorMessage = '';
    let regexpEmail =  new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    let regexpMotp =  new RegExp('^[a-z0-9A-Z._%+-]{8,16}$');
    let regexpNumber =  new RegExp('^[0-9]{8}$');
    if ( !regexpEmail.test(this.profile.email)) {
      test = false;
      this.errorMessage = this.errorMessage + 'Email Invalide. ';
    }
    if ( this.profile.nom === '') {
      test = false;
      this.errorMessage = this.errorMessage + 'Nom Invalide. ';
    }
    if ( this.profile.prenom === '') {
      test = false;
      this.errorMessage = this.errorMessage + 'Prenom Invalide. ';
    }
    if (! regexpMotp.test(this.profile.mdp)) {
      test = false;
      this.errorMessage = this.errorMessage + ' Mot de Passe Invalide. ';
    }
    if ( !regexpNumber.test(this.profile.cin)) {
      test = false;
      this.errorMessage = this.errorMessage + ' CIN Invalide. ';
    }
    if (! regexpNumber.test(this.profile.tel)) {
      test = false;
      this.errorMessage = this.errorMessage + ' Tel Invalide. ';
    }
    return test;
  }
  ajout() {
    this.ProGen.email = this.profile.email;
    this.ProGen.cin = this.profile.cin;
    this.ProGen.mdp = this.profile.mdp;
    this.ProGen.nom = this.profile.nom;
    this.ProGen.prenom = this.profile.prenom;
    this.ProGen.adresse = this.profile.adresse;
    this.ProGen.tel = this.profile.tel;
    console.log(this.ProGen);

    if (this.test()) {
      this.remSer.delete(this.ProGen.cin);
      console.log(this.ProGen);
      this.httpClient.put('https://smart-ruche.firebaseio.com/clients/' + this.ProGen.cin + '.json', this.ProGen);
     // this.router.navigate(['/client']);
    }

  }

}
