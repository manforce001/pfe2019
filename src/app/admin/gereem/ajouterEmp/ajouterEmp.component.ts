import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { RouterModule, Routes, Router , NavigationExtras } from '@angular/router';
import { Subject , Observable } from 'rxjs';
import { AfficheListeService } from '../../service/employee/afficheListe.service';
import { AjouteService } from '../../service/employee/ajout.service';




@Component({
  selector: 'app-ajouteremp',
  templateUrl: './ajouterEmp.component.html',
  styleUrls: ['./ajouterEmp.component.css']
})
export class AjouterEmpComponent implements OnInit {
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
  gouv: string;
  ville: string;
  region: any;
  errorMessage: string ;
  clientarray = [];
  data = {
    nbrRuche: 0,
    email: '',
    nom: '',
    prenom: '',
    cin: '',
    mdp: '',
    tel: '',
    ville: '',
    gouvernerat: ''
  };

  constructor(  private route: Router,
                private liste: AfficheListeService,
                private ajoute: AjouteService) {
    this.clientarray =   this.liste.get();
    this.errorMessage  = '';
}
test() {
  let test = true;
  this.errorMessage = '';
  let regexpEmail =  new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  let regexpMotp =  new RegExp('^[a-z0-9A-Z._%+-]{8,16}$');
  let regexpNumber =  new RegExp('^[0-9]{8}$');
  let testc = true;
  let testE = true;
  this.liste.get().forEach(e => {
    if (e.cin === this.data.cin) {
      testc = false;
    }
    if (e.email === this.data.email) {
      testE = false;
    }
  });

  if ( !regexpEmail.test(this.data.email)) {
    test = false;
    this.errorMessage = this.errorMessage + 'Email Invalide. ';
  }
  if (!testE) {
    test = false;
    this.errorMessage = this.errorMessage + ' Email existe. ';
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
  if (!testc) {
    test = false;
    this.errorMessage = this.errorMessage + ' CIN existe. ';
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
  this.data.gouvernerat = value as string;
  this.listeregion.forEach(element => {
   if (element["id"] === value) {

     this.region = element["liste"];
   }
  });

}
onChangeV(value: any) {
  this.data.ville = value as string;
}
ajouterClient() {
  if (this.test()) {
    this.ajoute.ajoute(this.data);
    this.route.navigate(['/admin']);
  }
}

  ngOnInit() {
  }

}
