import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ListeNotificationService {

  Subject = new Subject<any[]>();
  list: any;
  Listearray = [];
  emitSubject() {
    this.Subject.next(this.list);
  }
  constructor(  private httpClient: HttpClient) {}
  gets(cin: any) {
    this.httpClient
      .get<any[]>('https://smart-ruche.firebaseio.com/notificationC/' + cin + '.json')
      .subscribe(
        (response) => {

          this.list = response;
          this.emitSubject();
        },
        (error) => {
          return [];
        }
      );
    return this.list;
  }
  removeNotification(id: any) {

  }
}


