import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {
 
  numOfOrders:number = 100;

  constructor() { }

  ngOnInit(): void {
  }
  
  public customize(inputTagValue:any):void{
    this.numOfOrders = inputTagValue;
  }
}