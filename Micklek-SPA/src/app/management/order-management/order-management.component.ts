import { Component, OnInit } from '@angular/core';
import { OrderHeader } from 'src/app/models/order-header';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orderHeaders: OrderHeader[] =[];
  ordersNew: OrderHeader[] = [];
  ordersInProcess: OrderHeader[] = [];
  ordersDone: OrderHeader[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrderHeaders().subscribe(data => {
      this.orderHeaders = data;
      console.log(this.orderHeaders);
      this.sortOrdersByStatus();
    }, error => {
      console.log(error);
    });
  }

  sortOrdersByStatus() {
    console.log(this.orderHeaders);
    for (let i = 0; this.orderHeaders[i]; i++) {
      if (this.orderHeaders[i].statusId === 1) {
        this.ordersNew.push(this.orderHeaders[i]);
      }
      if (this.orderHeaders[i].statusId === 2) {
        this.ordersInProcess.push(this.orderHeaders[i]);
      }
      if (this.orderHeaders[i].statusId === 3) {
        this.ordersDone.push(this.orderHeaders[i]);
      }
    }
  }

}
