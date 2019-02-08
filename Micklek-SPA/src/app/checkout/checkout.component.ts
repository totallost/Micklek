import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orderLinesCheckout: Order[];
  totalSum = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    console.log('checkout');
    this.orderService.orderLines.subscribe(orderLines => {
      this.orderLinesCheckout = orderLines;
      console.log(this.orderLinesCheckout);
      console.log('inside');
      this.totalSumCalc();
    }, error => {
      console.log(error);
    });
  }

  delete(line: number) {
    this.orderService.removeLine(line);
  }

  totalSumCalc() {
    this.totalSum = 0;
    for (let i = 0; this.orderLinesCheckout.length > i; i++) {
      this.totalSum += this.orderLinesCheckout[i].item.price * this.orderLinesCheckout[i].amount;
    }
  }

  changeAmount(line, amount) {
    this.orderLinesCheckout[line - 1].amount = amount;
    this.totalSumCalc();
  }

  saveOrder() {
    this.orderService.orderLines.next(this.orderLinesCheckout);
  }

  onContinue() {
    this.saveOrder();
  }

}
