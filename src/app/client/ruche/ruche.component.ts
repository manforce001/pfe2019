import { Component, OnInit, ViewChild , Input } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { GetProfileService } from '../service/getProfile.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-ruche',
  templateUrl: './ruche.component.html',
  styleUrls: ['./ruche.component.css']
})

export class RucheComponent implements OnInit {


  @Input() maintenant: any;
  @Input() donnees =  [];
  @Input() temp = [];
  afficheOnce = true;
  t = true;
  p = true;
  h = true;

  chartP: any;  chartT: any;  chartH: any;
  @ViewChild('lineChartP') private chartRefP;
  @ViewChild('lineChartT') private chartRefT;
  @ViewChild('lineChartH') private chartRefH;
  donneesMaintenant: any;
  DonnesFinal = {
    temp : [],
    temperature: [],
    poid: [],
    humidite: []
  };
  donne() {
    let objet = {
      temp : this.temp,
      temperature: [],
      poid: [],
      humidite: []
    };
    for ( let key of this.donnees) {
      objet.poid.push(key.poid);
      objet.temperature.push(key.temperature);
      objet.humidite.push(key.humidite);
    }
    objet.temp = objet.temp.reverse();
    objet.temperature = objet.temperature.reverse();
    objet.poid = objet.poid.reverse();
    objet.humidite = objet.humidite.reverse();
    return objet;
  }
  affichecP() {
    this.p = !(this.p);
    this.afficheP();
    this.t = true;
    this.h = true;
  }
  affichecT() {
    this.t = !(this.t);
    this.afficheT();
    this.p = true;
    this.h = true;
  }
  affichecH() {
    this.h = !(this.h);
    this.afficheH();
    this.t = true;
    this.p = true;
  }
  afficheP() {
    this.chartP = new Chart(this.chartRefP.nativeElement, {
      type: 'line',
      data: {
        labels: this.DonnesFinal.temp,
        datasets: [
          {
            data: this.DonnesFinal.poid,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  afficheT() {
    this.chartT = new Chart(this.chartRefT.nativeElement, {
      type: 'line',
      data: {
        labels: this.DonnesFinal.temp,
        datasets: [
          {
            data: this.DonnesFinal.temperature,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true,
          }],
        }
      }
    });

  }
  afficheH() {
    this.chartH = new Chart(this.chartRefH.nativeElement, {
      type: 'line',
      data: {
        labels: this.DonnesFinal.temp,
        datasets: [
          {
            data: this.DonnesFinal.humidite,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  constructor() {}
  ngOnInit() {
    this.afficheP();
    this.afficheT();
    this.afficheH();
    this.DonnesFinal = this.donne();
  }
  moins12heures() {
    let objet = this.donne();
    let objetF = {
      temp : [],
      temperature: [],
      poid: [],
      humidite: []
    };
    let date = new Date();
    let nowH = date.getHours();
    let nowM = date.getMinutes();
    let nowD = date.getDate();
    let nowMo = date.getMonth();
    let nowA = date.getFullYear();
    let dateChercher;
    if (nowH - 12 > - 1) {
      dateChercher = (nowH - 12) + ':' + nowM + '-' + nowD + '-' + nowMo + '-' + nowA;
    } else {
        dateChercher = 24 + (nowH - 12) + ':' + nowM + '-' + (nowD - 1) + '-' + nowMo + '-' + nowA;
    }
    for(let key of objet.temp) {
      if (this.inf(dateChercher , key)) {
        let indice = objet.temp.indexOf(key);
        objetF.temp.push(key);
        objetF.poid.push(objet.poid[indice]);
        objetF.temperature.push(objet.temperature[indice]);
        objetF.humidite.push(objet.humidite[indice]);
      }
    }
    console.log(objetF);
    return objetF;

  }
  moins24heures() {
    let objet = this.donne();
    let objetF = {
      temp : [],
      temperature: [],
      poid: [],
      humidite: []
    };
    let date = new Date();
    let nowH = date.getHours();
    let nowM = date.getMinutes();
    let nowD = date.getDate();
    let nowMo = date.getMonth();
    let nowA = date.getFullYear();
    let dateChercher;
    if (nowD - 1 > 0) {
      dateChercher = nowH + ':' + nowM + '-' + (nowD-1) + '-' + nowMo + '-' + nowA;
    } else {
        dateChercher = nowH + ':' + nowM + '-' +(30 + (nowD - 1)) + '-' + (nowMo-1) + '-' + nowA;
    }
    for(let key of objet.temp) {
      if (this.inf(dateChercher , key)) {
        let indice = objet.temp.indexOf(key);
        objetF.temp.push(key);
        objetF.poid.push(objet.poid[indice]);
        objetF.temperature.push(objet.temperature[indice]);
        objetF.humidite.push(objet.humidite[indice]);
      }
    }
    return objetF;


  }
  moinssemaine() {
    let objet = this.donne();
    let objetF = {
      temp : [],
      temperature: [],
      poid: [],
      humidite: []
    };
    let date = new Date();
    let nowH = date.getHours();
    let nowM = date.getMinutes();
    let nowD = date.getDate();
    let nowMo = date.getMonth();
    let nowA = date.getFullYear();
    let dateChercher;
    if (nowD - 7 > 0) {
      dateChercher = nowH + ':' + nowM + '-' + (nowD - 7) + '-' + nowMo + '-' + nowA;
    } else {
      dateChercher = nowH + ':' + nowM + '-' + (30 + (nowD - 7)) + '-' + (nowMo - 1) + '-' + nowA;
    }
    for(let key of objet.temp) {
      if (this.inf(dateChercher , key)) {
        let indice = objet.temp.indexOf(key);
        objetF.temp.push(key);
        objetF.poid.push(objet.poid[indice]);
        objetF.temperature.push(objet.temperature[indice]);
        objetF.humidite.push(objet.humidite[indice]);
      }
    }
    return objetF;


  }
  moinsmois() {
    let objet = this.donne();
    let objetF = {
      temp : [],
      temperature: [],
      poid: [],
      humidite: []
    };
    let date = new Date();
    let nowH = date.getHours();
    let nowM = date.getMinutes();
    let nowD = date.getDate();
    let nowMo = date.getMonth();
    let nowA = date.getFullYear();
    let dateChercher;
    if (nowMo - 1 > 0) {
      dateChercher = nowH + ':' + nowM + '-' + nowD + '-' + (nowMo-1) + '-' + nowA;
    } else {
        dateChercher = nowH + ':' + nowM + '-' + nowD + '-' + (12 + (nowMo - 1)) + '-' + (nowA - 1);
    }
    for(let key of objet.temp) {
      if (this.inf(dateChercher , key)) {
        let indice = objet.temp.indexOf(key);
        objetF.temp.push(key);
        objetF.poid.push(objet.poid[indice]);
        objetF.temperature.push(objet.temperature[indice]);
        objetF.humidite.push(objet.humidite[indice]);
      }
    }
    return objetF;


  }
  inf(a: any , b: any) {
    //a<b
    let v = false;
    let ta = a.split('-');
    let tb = b.split('-');
    if (Number(ta[3]) === Number(tb[3])) {
      if (Number(ta[2]) === Number(tb[2])) {
        if (Number(ta[1]) === Number(tb[1])) {
          if (Number(ta[0].split(':')[0]) === Number(tb[0].split(':')[0])) {
            if (Number(ta[0].split(':')[1]) === Number(tb[0].split(':')[1])) {
              return true;
            } else { return (Number(ta[0].split(':')[1]) < Number(tb[0].split(':')[1])); }
          } else { return (Number(ta[0].split(':')[0]) < Number(tb[0].split(':')[0])); }
        } else { return Number(ta[1]) < Number(tb[1]); }
      } else { return Number(ta[2]) < Number(tb[2]); }
    } else { return Number(ta[3]) < Number(tb[3]); }
  }
  CourbeDate(date : string){
    this.DonnesFinal.temp.pop();
    this.DonnesFinal.poid.pop();
    this.DonnesFinal.temperature.pop();
    this.DonnesFinal.humidite.pop();

    if (date ==='tout'){
      this.DonnesFinal = this.donne();
    }
    if (date ==='0.5'){
      this.DonnesFinal = this.moins12heures();
    }
    if (date ==='1'){
      this.DonnesFinal = this.moins24heures();
    }
    if (date ==='7'){
      this.DonnesFinal = this.moinssemaine();
    }
    if (date ==='30'){
      this.DonnesFinal = this.moinsmois();
    }
    this.afficheP();
    this.afficheT();
    this.afficheH();
  }
}
