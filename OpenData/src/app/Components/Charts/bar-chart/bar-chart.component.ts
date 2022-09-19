import { Component, OnInit } from '@angular/core';

import { ChartConfiguration } from 'chart.js';
import { SalesDataService } from 'src/app/Services/SalesData/sales-data.service';

import { ResponseModel } from 'src/app/Models/ResponseModel';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Series A' },
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, 
  };
  
  constructor(private _salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this.setBarChartData();
  }

  private setBarChartData():void{

    let resp_page!:any;
    let arr_total:number[] = [];
    let arr_placed:string[] = [];

    this._salesDataService.getOrders(1,10)
      .subscribe((resp:ResponseModel) => {
         resp_page = resp.page;

         for(let i = 0; i < resp_page.data.length; i++)
         {
            arr_total.push(resp_page.data[i].total);
            arr_placed.push(resp_page.data[i].placed.slice(0,10));
         }

         this.barChartData.labels = arr_placed;
         this.barChartData.datasets[0].data = arr_total;

      })
  }
}




/* 
const SAMPLE_BARCHART_DATA: any[] = [
  {
    data: [1,2,3,4,5,6,7,8],label:'Q3 Sales'
  },
  {
    data: [8,7,6,5,4,3,2,1], label: 'Q4 Sales'
  }
];

const SAMPLE_BARCHART_LABELS: string[] = ['W1','W2','W3','W4','W5','W6','W7','W8'];
*/
