import { Component, OnInit } from '@angular/core';
import { OrderManagmentService } from 'src/app/services/order-managment.service';
import { OrderHeaderGlobal } from 'src/app/models/order-header-global';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {
  orderHeaders: OrderHeaderGlobal;
  constructor(private orderManagmentService: OrderManagmentService) { }

  ngOnInit() {
    if (this.orderManagmentService.orderHeaders.value.allOrderHeaders.length === 0) {
      this.orderManagmentService.getOrderHeaders().subscribe(data => {
        this.orderManagmentService.orderHeaders.value.allOrderHeaders = data;
        this.orderManagmentService.sortOrdersByStatus();
        this.orderManagmentService.orderHeaders.subscribe(allOrders => {
          this.orderHeaders = allOrders;
        });
      }, error => {
        console.log(error);
      });
    this.orderManagmentService.getStatuses().subscribe(data => {
      this.orderManagmentService.statuses = data;
    });
    } else {
      this.orderManagmentService.orderHeaders.subscribe(allOrders => {
        this.orderHeaders = allOrders;
      });
    }
  }
}
