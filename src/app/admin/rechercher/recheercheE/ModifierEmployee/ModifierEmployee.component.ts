import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { RouterModule, Routes, Router , NavigationExtras , ActivatedRoute } from '@angular/router';
import { AjouteService } from '../../../service/employee/ajout.service';
import { SupprimeService } from '../../../service/employee/supprime.service';



@Component({
  selector: 'app-modifieremployee',
  templateUrl: './ModifierEmployee.component.html',
  styleUrls: ['./ModifierEmployee.component.css']
})
export class ModifierEmployeeComponent implements OnInit {
 listeregion = [
    {'id': "sfax", 'liste': ["BirAl", "SakiyetZiyet"]},
    {'id': "tunis", 'liste': ["ssss", "zzzz"]},
    {'id': "gabes", 'liste': ["xxxx", "wwww"]},
  ];
  gouv: string;
  ville: string;
  region: any;
  errorMessage: string ;
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


  constructor(  private router: Router,
                private route: ActivatedRoute,
                private ajoute: AjouteService,
                private removeE: SupprimeService) {
    this.route.queryParams.subscribe(params => {
      this.data.cin = params.cin  ;
      this.data.email = params.email  ;
      this.data.gouvernerat = params.gouvernerat  ;
      this.data.mdp = params.mdp  ;
      this.data.nom = params.nom  ;
      this.data.prenom = params.prenom  ;
      this.data.tel = params.tel  ;
      this.data.ville = params.ville  ;

    });

    this.errorMessage  = '';
}
test() {
  let test = true;
  this.errorMessage = '';
  let regexpEmail =  new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  let regexpMotp =  new RegExp('^[a-z0-9A-Z._%+-]{8,16}$');
  let regexpNumber =  new RegExp('^[0-9]{8}$');

  if ( !regexpEmail.test(this.data.email)) {
    test = false;
    this.errorMessage = this.errorMessage + 'Email Invalide. ';
  }

  if ( this.data.nom === '') {
    test = false;
    this.errorMessage = this.errorMessage + 'Nom Invalide. ';
  }
  if ( this.data.prenom === '') {
    test = false;
    this.errorMessage = this.errorMessage + 'Prenom Invalide. ';
  }
  if (! regexpMotp.test(this.data.mdp)) {
    test = false;
    this.errorMessage = this.errorMessage + ' Mot de Passe Invalide. ';
  }
  if ( !regexpNumber.test(this.data.cin)) {
    test = false;
    this.errorMessage = this.errorMessage + ' CIN Invalide. ';
  }
  if (! regexpNumber.test(this.data.tel)) {
    test = false;
    this.errorMessage = this.errorMessage + ' Tel Invalide. ';
  }
  return test;
}
onChange(value: any) {
  this.region = null;
  this.gouv = null;
  this.ville = null;

  this.listeregion.forEach(element => {
   if (element["id"] === value) {
     this.region = element["liste"];
   }
  });

  this.data.gouvernerat = value as string;


}
onChangeV(value: any) {
  this.data.ville = value as string;

}
ajouterClient() {
  if (this.test()) {
    this.removeE.delete(this.data.cin);
    this.ajoute.ajoute(this.data);
    this.router.navigate(['/admin']);
  }
}

  ngOnInit() {
  }

}
