import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Data } from '../../gereclient/data';
import { Client } from '../../../interface/client';
import { Ruche } from '../../../interface/ruche';
import { DatePipe } from '@angular/common';
import { AjouteService } from '../../service/client/ajoute.service';
import { AfficheUnService } from '../../service/employee/afficheUn.service';
import { AfficheListeRucheService } from '../../service/client/afficheListeRuche.service';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { RechPlaceService } from '../../service/employee/recherche/rechPlace.service';
import { EmployeForm } from '../../service/employeForm';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ajouterucherech',
  templateUrl: './ajouteRucheRech.component.html',
  styleUrls: ['./ajouteRucheRech.component.css']
})
export class AjouteRucheRechComponent implements OnInit {
  list: AngularFireList<any>;
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
   cinemplres: string;
   date = new Date();
  data: any;
  ruche = {
    dateLancement: '',
    cinEmplRes: '',
    gouvernerat: '',
    ville: '',
  };
  empl = [];
  donnees = {
    poid: '0',
    humidite: '0',
    temperature: '0',
  };
constructor(private rech: RechPlaceService ,
            private route: ActivatedRoute ,
            private router: Router,
            private httpClient: HttpClient,
            private db: AngularFireDatabase,
            private listeRuche: AfficheListeRucheService,
            private aff: AfficheUnService) {
    this.route.queryParams.subscribe(params => {
       this.data = params  ;
    });
    this.empl = this.rech.getGouv(this.gouv);
    this.listeRuche.getid(this.data.cin);


   }

  ngOnInit() {
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
  }
  onChangeV(value: any) {
    this.ville = value as string;
    this.empListe = false;
    this.empl = this.rech.getGouv(this.gouv);

  }
  onChangeE(value: any) {

   this.cinemplres = value as string;
   console.log(this.cinemplres);
  }
  ajoute() {
    let idruche =  this.listeRuche.getid(this.data.cin) + 1;
    const date: string = this.date.getHours()+':'+this.date.getMinutes()+'-'+this.date.getDay()+'-'+this.date.getMonth()+'-'+this.date.getFullYear();
    this.ruche.dateLancement = date;
    this.ruche.cinEmplRes = this.cinemplres ;
    this.ruche.gouvernerat = this.gouv;
    this.ruche.ville = this.ville;
    this.httpClient.put('https://smart-ruche.firebaseio.com/clients/'+this.data.cin+'/ruches/'+idruche+'.json', this.ruche ).subscribe(
      () => {
        this.httpClient.put('https://smart-ruche.firebaseio.com/clients/'+this.data.cin+'/ruches/'+idruche+'/donnees/'+this.ruche.dateLancement+'.json', this.donnees ).subscribe(
          () => {
            this.router.navigate(['/admin']);
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

}
