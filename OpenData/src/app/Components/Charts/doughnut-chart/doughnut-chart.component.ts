import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

import { SalesDataService } from 'src/app/Services/SalesData/sales-data.service';


@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
  };
  public doughnutChartLabels:string[] = [];
  public doughnutChartDatasets = [ {
    data:[1,2,3] as number[],
  } ];
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [];

  constructor(private _salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this.setDoughnutChartData();
  }

  private setDoughnutChartData():void{

    let resp_state: string[] = [];
    let resp_total: number[] = [];

    this._salesDataService.getOrdersByState().subscribe((resp:any) => {

      for(let i  = 0; i < resp.length;i++)
      {
        resp_state.push(resp[i].state);
      }

      for(let i  = 0; i < resp.length;i++)
      {
        resp_total.push(resp[i].total);
      }
      this.doughnutChartLabels = resp_state;
      this.doughnutChartDatasets[0].data = resp_total;
    }) 

  }

}
