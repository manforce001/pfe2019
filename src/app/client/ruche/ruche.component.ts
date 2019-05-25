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
        labels: this.donne().temp,
        datasets: [
          {
            data: this.donne().poid,
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
        labels: this.donne().temp,
        datasets: [
          {
            data: this.donne().temperature,
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
  afficheH() {
    this.chartH = new Chart(this.chartRefH.nativeElement, {
      type: 'line',
      data: {
        labels: this.donne().temp,
        datasets: [
          {
            data: this.donne().humidite,
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
  ngOnInit() {}
}
