import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.css']
})
export class OrderPanelComponent implements OnInit {

  orderLines: Order[];

  constructor(private appComponent: AppComponent, private orderService: OrderService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.orderService.orderLines.subscribe(orderLines => {
      this.orderLines = orderLines;
      console.log(this.orderLines);
    });
  }

  collapse() {
    this.appComponent.tuggleSidebar();
  }

  delete(line: number) {
    this.orderService.removeLine(line);
  }

  reset() {
    this.alertify.confirm('MickLek', 'Are you sure you want to RESET the order?', () => {
      this.orderService.reset();
      this.alertify.success('Order was reset');
    }, () => {
      this.alertify.error('Reset Canceled');
    });
  }

}
