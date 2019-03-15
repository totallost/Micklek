import { Injectable } from '@angular/core';
import { OrderHeader } from '../models/order-header';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderHeaderGlobal } from '../models/order-header-global';

@Injectable({
  providedIn: 'root'
})
export class OrderManagmentService {
  urlBase = environment.apiUrl;

  orderHeaders = new BehaviorSubject<OrderHeaderGlobal>({
    allOrderHeaders: <OrderHeader[]>([]),
    ordersNew: <OrderHeader[]>([]),
    ordersVerified: <OrderHeader[]>([]),
    ordersDone: <OrderHeader[]>([])
  });
  constructor(private http: HttpClient) { }

  getOrderHeaders() {
    this.initOrderHeaders();
    return this.http.get<OrderHeader[]>(this.urlBase + 'items/management/get-order-headers');
  }

   sortOrdersByStatus() {
     for (let i = 0; this.orderHeaders.value.allOrderHeaders[i]; i++) {
       if (this.orderHeaders.value.allOrderHeaders[i].statusId === 1) {
         this.orderHeaders.value.ordersNew.push(this.orderHeaders.value.allOrderHeaders[i]);
       }
       if (this.orderHeaders.value.allOrderHeaders[i].statusId === 2) {
         this.orderHeaders.value.ordersVerified.push(this.orderHeaders.value.allOrderHeaders[i]);
       }
       if (this.orderHeaders.value.allOrderHeaders[i].statusId === 3) {
         this.orderHeaders.value.ordersDone.push(this.orderHeaders.value.allOrderHeaders[i]);
       }
     }
   }

   initOrderHeaders() {
     this.orderHeaders.value.allOrderHeaders = [];
     this.orderHeaders.value.ordersDone = [];
     this.orderHeaders.value.ordersNew = [];
     this.orderHeaders.value.ordersVerified = [];
   }

   getOrderHeader(orderNumber: number) {
      const orders: OrderHeader[] =  this.orderHeaders.value.allOrderHeaders;
      for (let i = 0; orders.length > i; i++) {
        if (orders[i].id === +orderNumber) {
          return orders[i];
        }
      }
   }

}
