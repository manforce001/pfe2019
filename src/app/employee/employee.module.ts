import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';
import {  RouterModule , Routes } from '@angular/router';
import { NoteComponent } from './Note/Note.component';
import { AuthGuardService } from '../login/AuthGuard.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase';


const routes: Routes = [
  {path: 'employee' ,  canActivate : [AuthGuardService]  , component: EmployeeComponent },
  { path: 'employee/notification' , component: NotificationComponent },
  { path: 'employee/note' , component: NoteComponent },
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes), FormsModule, BrowserModule,
    AngularFireModule.initializeApp(environment.firebase) , AngularFireAuthModule , AngularFireDatabaseModule,
  ],
  declarations: [
    EmployeeComponent,
    NavbarComponent,
    NotificationComponent,
    NoteComponent
]
})
export class EmployeeModule { }
