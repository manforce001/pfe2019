import { Component, OnInit  } from '@angular/core';
import { GetProfileService } from './service/getProfile.service';
import * as firebase from 'firebase';
import { ActivatedRoute , Router } from '@angular/router';
import { ListeNotificationService} from './service/ListeNotification.service';
import { environment } from '../../environments/environment';
import { GetserviceService } from './service/getservice.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit  {
  email: string;
  profile: any;
  ListeClient = [];
  NotificationViewListe = true;
  arrayIndexNotif = [];
  notifications= [];
  NotificationReponde;
  dicriptionNotificationReponde;
  resultatNotificationReponde;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private ListeSer: GetProfileService,
              private ListeNotif: ListeNotificationService,
              private getliste: GetserviceService,
              private getprofile: ProfileService) {
                firebase.initializeApp(environment.firebase, 'empFire');

                route.queryParams.subscribe(params => {
                  this.email = params.email;
                });
                this.profile = getprofile.get();
                this.ListeNotif.gets(this.profile.cin);
 }

 afficheNotification() {
    const array = [];
    array.pop();
    let nx = this.ListeNotif.gets(this.profile.cin);
    for (let n in nx){
      array.push(nx[n]);
      if( this.arrayIndexNotif.indexOf(n) < 0) { this.arrayIndexNotif.push(n);}
    }
    this.NotificationViewListe = false;
    this.notifications.pop();
    this.notifications = array;
  }
  getNotif(notification) {
    this.NotificationReponde = notification;
  }
  NotificationRepondeResultat(choix) {
    this.resultatNotificationReponde = choix;
  }
  reponde() {
    this.ListeNotif.reponde(this.dicriptionNotificationReponde,
                            this.NotificationReponde.client,
                            this.profile.cin,
                            this.resultatNotificationReponde,
                            this.NotificationReponde.rucheid);
    this.ListeNotif.moveToHistorique(this.NotificationReponde.date, this.profile.cin);
  }
  Deconnexion() {
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }
  ngOnInit() { }

}
