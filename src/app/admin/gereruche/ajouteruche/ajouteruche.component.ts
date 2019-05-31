import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Client } from '../../../interface/client';
import { AjouteService } from '../../service/client/ajoute.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';



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
  dblisteE;
  listeE;
  listeEmploye = [];
constructor(private route: ActivatedRoute ,
            private router: Router,
            private aj: AjouteService ,
            private db: AngularFireDatabase,
            private httpClient: HttpClient) {
              this.dblisteE = db.list('/employe');
    this.route.queryParams.subscribe(params => {
       this.data = params as Client ;
    });
   }
  ngOnInit() {
    this.getListE ();
  }
  ajoute() {
    const date: string =  this.date.getHours()+':'+this.date.getMinutes()+'-'+this.date.getDay()+'-'+this.date.getMonth()+'-'+this.date.getFullYear();
    this.ruche.dateLancement = date;
    this.ruche.cinEmplRes = this.cinemplres;
    this.ruche.gouvernerat = this.gouv;
    this.ruche.ville = this.ville;
    this.aj.ajoute(this.data , this.ruche );
    let nbrRuche =((this.getE(this.cinemplres).nbrRuche as number ) + 1 ).toString();
    this.httpClient.put('https://smart-ruche.firebaseio.com/employe/' +this.cinemplres+ '/nbrRuche.json', nbrRuche).subscribe(()=>{ console.log("valide")},(error)=>{console.log("non val"+error)});
    this.router.navigate(['/admin']);
  }
  getListE () {
    this.dblisteE.valueChanges().subscribe(firebaseData => {
      this.listeE = firebaseData;
    });

   }
  getListeEmpl() {
    this.listeEmploye.pop();
    this.getListE();
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
  getE(cin) {
    let w;
    this.getListeEmpl();
    const a = this.listeEmploye;
    for(let key of a){
        w = key;
    }
    return w;
  }
  getListeE(place) {
    let listeEmp = [];
    this.getListeEmpl();
    listeEmp.pop();
    const a = this.listeEmploye;
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
