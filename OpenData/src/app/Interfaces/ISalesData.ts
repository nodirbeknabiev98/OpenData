import { Observable } from "rxjs";
import { ResponseModel } from "../Models/ResponseModel";

export interface ISalesData{
    getOrders(pageIndex: number, pageSize: number):Observable<ResponseModel>;
    getOrdersByCustomer(n :number):Observable<any>;
    getOrdersByState():Observable<any>;
}