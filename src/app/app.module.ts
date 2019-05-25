import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import {EmployeeModule} from './employee/employee.module';
import { AuthGuardService } from './login/AuthGuard.service';

import { AppComponent } from './app.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
 // firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
],
  imports: [
    BrowserModule, FormsModule,
    AdminModule, ClientModule, EmployeeModule, NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase) , AngularFireAuthModule , AngularFireDatabaseModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
