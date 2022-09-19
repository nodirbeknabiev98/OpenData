import {CustomerModel} from './CustomerModel';

export interface OrderModel{
    id:number;
    customer: CustomerModel;
    total: number;
    placed: Date;
    fulfilled: Date;
}