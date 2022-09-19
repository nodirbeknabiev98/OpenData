import { Injectable } from '@angular/core';
import { ILineChart } from 'src/app/Interfaces/ILineChart';

@Injectable({
  providedIn: 'root'
})
export class LineChartService implements ILineChart{

  constructor() { }

  public extractTopThreeCustomers(resp:any):Map<string[],Object>{

    let customersAndNumOfOrders = new Map();
    let topThreeCustomers = new Map();
    let topThreeCustomers_name:string[] = [];
    let topThreeCustomers_numOfOrders:number[] = [];
  
    let finalHashMap = new Map();
    let resp_page_total:number[] = [];
    let resp_page_placed:string[]= [];
  
    let valueOfKey:number = 0;


    for(let i  = 0; i < resp.page.data.length;i++)
    {   
        if(customersAndNumOfOrders.has(resp.page.data[i].customer.name))
        {
          valueOfKey =  customersAndNumOfOrders.get(resp.page.data[i].customer.name) + 1;
          customersAndNumOfOrders.set(resp.page.data[i].customer.name,valueOfKey);
        }
        else{
          customersAndNumOfOrders.set(resp.page.data[i].customer.name,1);
        }
    }
    
    /*Extracting top 3 customers from customersAndNumOfOrders hashmap */
    if(customersAndNumOfOrders.size > 0 )
    {
      for(let i =0; i < 3;i++)
      { 
        let max  = 0;
        let topCustomer_name ="";
        let topCustomer_numOfOrders = 0;
       
        for(let custm of customersAndNumOfOrders)
        {
          if(custm[1] > max)
          {
              max = custm[1]; 
              topCustomer_name = custm[0];
              topCustomer_numOfOrders = custm[1];
          }
        }
        topThreeCustomers.set(topCustomer_name,topCustomer_numOfOrders);
        customersAndNumOfOrders.delete(topCustomer_name);
      }
    }

    if(topThreeCustomers.size > 0)
    {
      for(let custm of topThreeCustomers)
      {
        topThreeCustomers_name.push(custm[0]);
        topThreeCustomers_numOfOrders.push(custm[1]);
      }
    }
    /*Building the data array of the three top customers which consists of all 'total' */

    for(let i= 0 ; i< 3; i++)
    {
      resp_page_total = [];
      resp_page_placed = [];
      for(let j  = 0; j < resp.page.data.length;j++)
      {
        if(resp.page.data[j].customer.name  == topThreeCustomers_name[i])
        {
          resp_page_total.push(resp.page.data[j].total);
          resp_page_placed.push(resp.page.data[j].placed.slice(0,10));
        }
      } 

      finalHashMap.set(topThreeCustomers_name[i],{total:resp_page_total,placed: resp_page_placed});
    }
    
    return finalHashMap;
  } 
}
