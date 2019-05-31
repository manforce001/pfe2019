import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ModifierProfileComponent } from './modifierProfile/modifierProfile.component';
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from '../login/AuthGuard.service';
import { RucheComponent } from './ruche/ruche.component';
import { GaugeChartModule } from 'angular-gauge-chart';
import { ItemComponent } from './ruche/item/item.component';


const route: Routes = [
    {path: 'client' ,  canActivate : [AuthGuardService]  , component: ClientComponent },
    {path: 'client/modifier',  canActivate : [AuthGuardService] , component: ModifierProfileComponent},
  ];
@NgModule({
  imports: [
    CommonModule, HttpClientModule, FormsModule, BrowserModule, GaugeChartModule,
    AngularFireModule.initializeApp(environment.firebase) , AngularFireAuthModule , AngularFireDatabaseModule,
    RouterModule.forChild(route)
  ],
  declarations: [
    ClientComponent,
    ModifierProfileComponent,
    RucheComponent,
    ItemComponent
  ],
  providers: [AuthGuardService],
  exports: [

  ]
})
export class ClientModule { }
