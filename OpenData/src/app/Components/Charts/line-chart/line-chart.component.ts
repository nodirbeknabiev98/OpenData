import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { ChartConfiguration} from 'chart.js';
import { ChartOptions } from 'chart.js';

import { SalesDataService } from 'src/app/Services/SalesData/sales-data.service';
import { LineChartService } from 'src/app/Services/LineChart/linechart.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {
  
  @Input() inputToLineChartComp!:number;
  @ViewChild(BaseChartDirective) public chart!: BaseChartDirective;

  numOfOrders:number = 0;


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels:[] as string[],
    datasets: [
      {
        data: [] as number[], 
        label: 'Series A', 
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(0,200,140,0.5)',
        backgroundColor: 'rgba(6,214,160,0.2)',
        pointBackgroundColor: '#000',
        pointBorderColor: '#000',
        pointHoverBackgroundColor:'#555',
        pointHoverBorderColor: '#555'
      },
      {
        data: [] as number[], 
        label: 'Series B', 
        fill: true,
        tension: 0.5,
        backgroundColor: 'rgba(255, 209, 102, 0.2)',
        borderColor: 'rgba(240, 180, 89, 0.5)',
        pointBackgroundColor: '#000',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#555',
        pointHoverBorderColor: '#555'
      },
      {
        data: [] as number[], 
        label: 'Series C', 
        fill: true,
        tension: 0.5,
        backgroundColor: 'rgba(15, 78, 133, 0.2)',
        borderColor: 'rgba(3, 64, 128, 0.5)',
        pointBackgroundColor: '#000',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#555',
        pointHoverBorderColor: '#555'
      },

    ],
    
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartLegend = true;

  constructor(private _salesDataService: SalesDataService, private _lineChartService: LineChartService ) { }

  ngOnInit(): void {
    this.setLineChartData();
  }

  
  ngOnChanges(changes: SimpleChanges) {
    this.inputToLineChartComp = changes['inputToLineChartComp'].currentValue;
    this.setLineChartData();
  }


  private setLineChartData():void {
  
    this._salesDataService.getOrders(1,this.inputToLineChartComp).subscribe((resp:any) => {

      //console.log(resp);
      let finalHashMap = new Map();

      finalHashMap  =  this._lineChartService.extractTopThreeCustomers(resp);
      console.log(finalHashMap);
      
      let i = 0;
      for(let custm of finalHashMap)
      {
        this.lineChartData.datasets[i].label = custm[0];
        this.lineChartData.labels =  custm[1].placed;
        this.lineChartData.datasets[i].data = custm[1].total;
        i++;
      }
      if (this.chart && this.chart.chart) {
        this.chart.chart.update();
      }
  });
  

 



  }

  
}
