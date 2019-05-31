import { Component,  OnInit, ViewChild , Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @ViewChild('lineChartT') private chartRefT;
  chartP: any;  chartT: any;  chartH: any;

  public canvasWidth = 300;
  public needleValue = 10;
  public centralLabel = '';
  public name = 'Température';
  public bottomLabel = 20;
  public options = {
      hasNeedle: true,
      needleColor: 'rgb(137, 114, 114)',
      needleUpdateSpeed: 1000,
      arcColors: ['#18c101', 'rgb(224, 41, 31)'],
      arcDelimiters: [75],
      needleStartValue: 0,
  };
  constructor() { }

  ngOnInit() {
    this.chartT = new Chart(this.chartRefT.nativeElement, {
      type: 'line',
      data: {
        labels: [0,1,2,3,0],
        datasets: [
          {
            data: [0,1,2,3,0],
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
            autoSkip: true
          }],
          yAxes: [{
            display: true,
            autoSkip: true
          }],
        }
      }
    });
  }

}
