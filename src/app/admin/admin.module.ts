import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import {  RouterModule , Routes } from '@angular/router';


import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';

import { NotificationComponent } from './notification/notification.component';
import { AjouteClientComponent } from './gereclient/ajouteClient/ajouteClient.component';
import { SuppClientComponent } from './gereclient/SuppClient/SuppClient.component';
import { AjouterEmpComponent } from './gereem/ajouterEmp/ajouterEmp.component';
import { ModifierEmpComponent } from './gereem/ModifierEmp/ModifierEmp.component';
import { SupprimerEmpComponent } from './gereem/supprimerEmp/supprimerEmp.component';
import { AjouterucheComponent } from './gereruche/ajouteruche/ajouteruche.component';
import { MaintenancerucheComponent } from './gereruche/maintenanceruche/maintenanceruche.component';
import { RechMEComponent } from './rechercher/recheercheE/RechME/RechME.component';
import { RechSeComponent } from './rechercher/recheercheE/RechSe/RechSe.component';
import { RechARComponent } from './rechercher/rechercheC/RechAR/RechAR.component';
import { RechSCComponent } from './rechercher/rechercheC/RechSC/RechSC.component';
import { ModifierEmployeeComponent } from './rechercher/recheercheE/ModifierEmployee/ModifierEmployee.component';
import { AjouteRucheRechComponent } from './gereruche/ajouteRucheRech/ajouteRucheRech.component';
import { AuthGuardService } from '../login/AuthGuard.service';



const route: Routes = [
  {path: 'admin',   component: AdminComponent },
  {path: 'admin/client/ajoute',   component: AjouteClientComponent},
  {path: 'admin/client/supprimer', component: SuppClientComponent},
  {path: 'admin/employe/ajoute',   component: AjouterEmpComponent},
  {path: 'admin/employe/modifier', component: ModifierEmpComponent},
  {path: 'admin/employe/supprimer',  component: SupprimerEmpComponent},
  {path: 'admin/ruche/ajouter',  component: AjouterucheComponent},
  {path: 'admin/ruche/maintenance',  component: MaintenancerucheComponent},
  {path: 'admin/ListModifierEmploye',  canActivate : [AuthGuardService], component: RechMEComponent},
  {path: 'admin/ListSupprimerEmploye',  canActivate : [AuthGuardService], component: RechSeComponent},
  {path: 'admin/ListAjouteRuche',  canActivate : [AuthGuardService], component: RechARComponent},
  {path: 'admin/ListSupprimerClient',  canActivate : [AuthGuardService], component: RechSCComponent},
  {path: 'admin/ModifierEmploye',  canActivate : [AuthGuardService], component: ModifierEmployeeComponent},
  {path: 'admin/client/ruche/ajouter', component: AjouteRucheRechComponent},



];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase) , AngularFireAuthModule , AngularFireDatabaseModule,
    RouterModule.forChild(route)
  ],
  declarations: [
    AdminComponent,
    NavbarComponent,
    RechSCComponent, RechARComponent, RechSeComponent, RechMEComponent, ModifierEmployeeComponent,
    AjouterucheComponent, MaintenancerucheComponent,
    NotificationComponent, AjouteRucheRechComponent,
    AjouteClientComponent , SuppClientComponent,
    SupprimerEmpComponent, AjouterEmpComponent , ModifierEmpComponent,

],
providers: [AuthGuardService],
exports : [


],
bootstrap: [AdminComponent]

})

export class AdminModule { }
