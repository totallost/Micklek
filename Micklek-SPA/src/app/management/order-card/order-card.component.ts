import { Component, OnInit, Input } from '@angular/core';
import { OrderHeader } from 'src/app/models/order-header';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() orderHeader: OrderHeader;
  constructor() { }

  ngOnInit() {
  }

}
