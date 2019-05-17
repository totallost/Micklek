import { Injectable } from '@angular/core';
import { OrderHeader } from '../models/order-header';
import { Order } from '../models/order';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderHeaderGlobal } from '../models/order-header-global';
import { Statuses } from '../models/statuses';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderManagmentService {
  urlBase = environment.apiUrl;

  statuses: Statuses;

  orderHeaders = new BehaviorSubject<OrderHeaderGlobal>({
    allOrderHeaders: <OrderHeader[]>([]),
    ordersNew: <OrderHeader[]>([]),
    ordersVerified: <OrderHeader[]>([]),
    ordersDone: <OrderHeader[]>([])
  });

  constructor(private http: HttpClient, private auth: AuthService) { }

  getOrderHeaders() {
    this.initOrderHeaders();
    return this.http.get<OrderHeader[]>(this.urlBase + 'orders/management/get-order-headers', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    });
  }

  sortOrdersByStatus() {
    this.orderHeaders.value.ordersDone.splice(0);
    this.orderHeaders.value.ordersNew.splice(0);
    this.orderHeaders.value.ordersVerified.splice(0);
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
    const orders: OrderHeader[] = this.orderHeaders.value.allOrderHeaders;
    for (let i = 0; orders.length > i; i++) {
      if (orders[i].id === +orderNumber) {
        return orders[i];
      }
    }
  }

  getOrderLines(id: number) {
    return this.http.get<Order[]>(this.urlBase + 'orders/management/get-order-lines/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    });
  }

  updateOrder(clientInfo, orderLines) {
    let _orderDetails: any = {};
    _orderDetails = orderLines;
    const newOrder = {
      clienDetails: clientInfo,
      orderDetails: _orderDetails
    };
    return this.http.post(this.urlBase + 'orders/management/update-order', newOrder, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    });
  }

  getStatuses() {
    return this.http.get<Statuses>(this.urlBase + 'orders/management/get-statuses', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    });
  }

}
