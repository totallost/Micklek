import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Item } from '../models/item';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderLines = new BehaviorSubject<Order[]>([]);
  urlBase = environment.apiUrl;
  orderLine = [];
  itemExist: boolean;
  constructor(private http: HttpClient) { }

  addLine(item: Item) {
    this.orderLines.subscribe(orderLine => {
      this.orderLine = orderLine;
    });
    if (this.orderLine) {
      for (let i = 0; this.orderLine.length > i; i++) {
        if (this.orderLine[i].item === item) {
          this.orderLine[i].amount++;
          this.orderLines.next(this.orderLine.slice());
          this.itemExist = true;
        }
      }
    }
    if (!this.itemExist) {
      this.orderLine.push({
        id: null,
        orderId: null,
        itemId: item.id,
        item: item,
        amount: 1,
        lineNumber: this.orderLine.length + 1
      });
      this.orderLines.next(this.orderLine.slice());
    }
    this.itemExist = false;
  }

  removeLine(line: number) {
    this.orderLine.splice(line - 1 , 1);
    for (let i = 0; this.orderLine.length > i; i++) {
      this.orderLine[i].lineNumber = i + 1;
    }
    this.orderLines.next(this.orderLine.slice());
  }

  reset() {
    this.orderLine = [];
    this.orderLines.next(this.orderLine.slice());
  }

  totalItems() {
    let total = 0;
    for (let i = 0; this.orderLine.length > i; i++) {
      total += this.orderLine[i].amount;
    }
    return total;
  }

  postOrderInfo(clientInfo) {
    const newOrder = {
      clienDetails: clientInfo,
      orderDetails: this.orderLines
    };
    return this.http.post(this.urlBase + '/details/sendOrder/', newOrder);
  }

}
