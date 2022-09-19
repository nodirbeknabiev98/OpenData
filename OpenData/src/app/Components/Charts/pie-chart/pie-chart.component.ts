import { Component, OnInit } from '@angular/core';

import { ChartOptions } from 'chart.js';
import { SalesDataService } from 'src/app/Services/SalesData/sales-data.service';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels:string[] =[];
  public pieChartDatasets = [ {
    data: [1,2,3] as number[]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private _salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this.setPieChartData();
  }

  private setPieChartData():void{
    let resp_name: string[] = [];
    let resp_total:number[] = [];

    this._salesDataService.getOrdersByCustomer(5).subscribe((resp:any) => {
      
      for(let i  = 0; i < resp.length;i++)
      {
        resp_total.push(resp[i].total);
      }
      for(let i  = 0; i < resp.length;i++)
      {
        resp_name.push(resp[i].name);
      }

      this.pieChartLabels = resp_name;
      this.pieChartDatasets[0].data = resp_total;
    }) 
  }

}
