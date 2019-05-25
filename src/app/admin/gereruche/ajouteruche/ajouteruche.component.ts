import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Data } from '../../gereclient/data';
import { Client } from '../../../interface/client';
import { Ruche } from '../../../interface/ruche';
import { AjouteService } from '../../service/client/ajoute.service';
import { GetSetListeService } from '../../service/employee/recherche/getSetListe.service';
import { RechPlaceService } from '../../service/employee/recherche/rechPlace.service';
import { AfficheListeService } from '../../service/employee/afficheListe.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-ajouteruche',
  templateUrl: './ajouteruche.component.html',
  styleUrls: ['./ajouteruche.component.css']
})


export class AjouterucheComponent implements OnInit {
  empListe = true;
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
  cinemplres;
  date = new Date ();
  data: Client;
  ruche = {
    dateLancement: '',
    cinEmplRes: '',
    gouvernerat: '',
    ville: '',
  };

  empl = [];
constructor(private rech: RechPlaceService ,
            private route: ActivatedRoute ,
            private router: Router,
            private aj: AjouteService ,
            private xx: GetSetListeService,
            private ListeE: AfficheListeService,
            private httpClient: HttpClient) {
    this.route.queryParams.subscribe(params => {
       this.data = params as Client ;
    });
   }
  ngOnInit()
  {
    0
  }
  ajoute() {
    const date: string =  this.date.getHours()+':'+this.date.getMinutes()+'-'+this.date.getDay()+'-'+this.date.getMonth()+'-'+this.date.getFullYear();
    this.ruche.dateLancement = date;
    this.ruche.cinEmplRes = this.cinemplres;
    this.ruche.gouvernerat = this.gouv;
    this.ruche.ville = this.ville;
    this.aj.ajoute(this.data , this.ruche );
    console.log(this.getE(this.cinemplres));
    let nbrRuche =((this.getE(this.cinemplres).nbrRuche as number ) + 1 ).toString;

    this.httpClient.put('https://smart-ruche.firebaseio.com/employe/' +this.cinemplres.cin+ '/nbrRuche.json', nbrRuche);
    this.router.navigate(['/admin']);
  }
  getE(cin) {
    let w;
    const a = this.xx.get();
    for(let key of a){
      if(key.cin === cin) {
        w = key;
      }
    }
    return w;
  }
  getListeE(place) {
    let listeEmp = [];
    listeEmp.pop();
    const a = this.xx.get();
    for (let key of a ){
      if ((key.gouvernerat === place)&& ( listeEmp.indexOf(key) < 0)) {
        listeEmp.push(key);
      }
    }
    return listeEmp;
  }
  onChange(value: any) {
    this.empl = null;
    this.region = null;
    this.gouv = null;
    this.ville = null;
    this.gouv = value as string;
    this.listeregion.forEach(element => {
     if (element["id"] === value) {
       this.region = element["liste"];
     }
    });
    this.empl = this.getListeE(this.gouv);
  }
  onChangeV(value: any) {
    this.ville = value as string;
    this.empListe = false;
    this.empl = this.getListeE(this.gouv);
  }
  onChangeE(value: any) {
   this.cinemplres = value as string;

  }

}
