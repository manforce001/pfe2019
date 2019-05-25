import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule , AngularFireList , AngularFireDatabase } from 'angularfire2/database';
import { Subject , Observable } from 'rxjs';
import { RouterModule, Routes, Router , NavigationExtras } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { AfficheListeService } from '../admin/service/client/afficheListe.service';
import { AfficheListeService as AfficheListeServiceEmp} from '../admin/service/employee/afficheListe.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Identifient: string;
  mdp: string;
  subject = new Subject<any[]>();
  admi: any;
  ListeClients = [] ;
  ListeEmps = [] ;
  isAuth = false;
  p;
  emit() {
    this.subject.next(this.admi);
  }
  constructor( private router: Router,
               private db: AngularFireDatabase,
               private http: HttpClient,
               private listeClient: AfficheListeService,
               private listeEmp: AfficheListeServiceEmp,
               private spinner: NgxSpinnerService,
               private getSetprofile: ProfileService ) {
    this.testAdmin(this.Identifient);
    listeClient.get();
    listeEmp.get();

  }

  ngOnInit() {}
  affiche() {
  }
  connect() {
    this.spinner.show();
    firebase.auth().signInWithEmailAndPassword(this.Identifient, this.mdp).then(() => {
      if (this.testAdmin(this.Identifient)) {
        this.router.navigate(['/admin']);
        this.isAuth = true;
      } else {
        if (this.testClient(this.Identifient)) {
          this.getSetprofile.set(this.p);
          this.router.navigate(['/client'], { queryParams : { email: this.Identifient}});
          this.isAuth = true;
        } else {
          if (this.testEmployee(this.Identifient) ) {
            this.getSetprofile.set(this.p);
            this.router.navigate(['/employee'], { queryParams : { email: this.Identifient}});
            this.isAuth = true;
          } else {
            firebase.auth().signOut();
            this.router.navigate(['/']);
            this.isAuth = false;
          }
        }
      }
    } , (error) => {
      this.spinner.hide();
      console.log(error.code);
    }
  );

  }
  testAdmin( email: string) {
      this.http.get<any[]>('https://smart-ruche.firebaseio.com/admin/email.json')
      .subscribe((response) => {
          this.admi = response;
          this.emit();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

      if (this.admi === email) {
        return true;
      } else {
        return false;
      }

  }
  testClient( email: string) {
   let verif = false;
   this.ListeClients = this.listeClient.get();
   this.ListeClients.forEach(action => {
    if ( action.email === email) {
      verif = true;
      this.p = action;
    }
   });
   return verif;
  }
  testEmployee( email: string) {
    let verif = false;
    this.ListeEmps = this.listeEmp.get();
    this.ListeEmps.forEach(action => {
     if ( action.email === email) {
       verif = true;
       this.p = action;
     }
    });
    return verif;
   }
}
