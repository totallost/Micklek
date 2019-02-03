import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  totalItems = 0;

  constructor(private appComponent: AppComponent, private orderService: OrderService) { }

  ngOnInit() {
    this.totalItems = 0;
    this.orderService.orderLines.subscribe(orders => {
      this.totalItems = 0;
      for (let i = 0; orders.length > i; i++) {
        this.totalItems += orders[i].amount;
      }
    });
  }

  collapse() {
    this.appComponent.tuggleSidebar();
  }

}
