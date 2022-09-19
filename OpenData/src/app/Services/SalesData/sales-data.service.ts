import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ResponseModel } from '../../Models/ResponseModel';
import { ISalesData } from '../../Interfaces/ISalesData';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService implements ISalesData{
  
  constructor(private _http: HttpClient) 
  { }


  getOrders(pageIndex: number, pageSize: number):Observable<ResponseModel> {
    return this._http.get<ResponseModel>('https://localhost:44319/api/order/' + pageIndex + '/' + pageSize).pipe(map(res => res || []));
  }

  getOrdersByCustomer(n :number):Observable<any> {
    return this._http.get<any>('https://localhost:44319/api/order/bycustomer/' + n).pipe(map(res => res || []));
  }

  getOrdersByState():Observable<any> {
    return this._http.get<any>('https://localhost:44319/api/order/bystate/').pipe(map(res => res || []));
  }

}