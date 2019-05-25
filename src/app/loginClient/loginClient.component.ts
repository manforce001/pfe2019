import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule , AngularFireList } from 'angularfire2/database';
import { Subject , Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginclient',
  templateUrl: './loginClient.component.html',
  styleUrls: ['./loginClient.component.css']
})
export class LoginClientComponent implements OnInit {
  Identifient: string;
  mdp: string;
  cin: any ;
  constructor(  private router: Router) { }

  ngOnInit() {

  }

}
