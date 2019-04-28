import { Component, OnInit } from '@angular/core';
import { OrderManagmentService } from 'src/app/services/order-managment.service';
import { OrderHeaderGlobal } from 'src/app/models/order-header-global';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {
  orderHeaders: OrderHeaderGlobal;
  constructor(private orderManagmentService: OrderManagmentService, private alertify: AlertifyService, private router: Router) { }

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
        this.alertify.error('Unauthorized!');
        this.router.navigate(['/login']);
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
