import { Component, OnInit } from '@angular/core';

import { ResponseModel } from 'src/app/Models/ResponseModel';

import { SalesDataService } from 'src/app/Services/SalesData/sales-data.service';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  orders!:any;
  total:number = 0;

  page:number =1;
  limit:number  = 9;

  loading:boolean = false;

  response_page!:any;

  constructor(private _salesData: SalesDataService) { }

  ngOnInit(): void { 
    this.getOrders();
  }

 
  goToPrevious():void{
    this.page--;
    this.getOrders();
  }

  goToNext():void{
    this.page++;
    this.getOrders();
  }

  goToPage(n:number):void{
    this.page = n;
    this.getOrders();
  }

  getOrders(): void {
    this._salesData.getOrders(this.page, this.limit)
      .subscribe((res:ResponseModel) => {
         /*
            We can't do directly: this.orders = res.page; 
            Must read why!
         */
         this.response_page = res.page;
         this.orders = this.response_page.data;
         this.total = this.response_page.total;
         this.loading = false;
      });
  }

}





/*
 orders:OrderModel[] = [
    {
      id:1,
      customer: {id:1,name: 'Nodirbek Nabiev', state: 'Tashkent', email:'nodirbeknabiev98@gmail.com'},
      total:230,
      placed: new Date(2020,12,1),
      fulfilled: new Date(2020,12,1),
    },
    {
      id:1,
      customer: {id:1,name: 'Nodirbek Nabiev', state: 'Tashkent', email:'nodirbeknabiev98@gmail.com'},
      total:230,
      placed: new Date(2020,12,1),
      fulfilled: new Date(2020,12,1),
    },
    {
      id:1,
      customer: {id:1,name: 'Nodirbek Nabiev', state: 'Tashkent', email:'nodirbeknabiev98@gmail.com'},
      total:230,
      placed: new Date(2020,12,1),
      fulfilled: new Date(2020,12,1),
    },
    {
      id:1,
      customer: {id:1,name: 'Nodirbek Nabiev', state: 'Tashkent', email:'nodirbeknabiev98@gmail.com'},
      total:230,
      placed: new Date(2020,12,1),
      fulfilled: new Date(2020,12,1),
    },
  ]; 


*/
