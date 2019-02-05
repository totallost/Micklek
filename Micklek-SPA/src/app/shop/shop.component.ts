import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ItemService } from '../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  items: Item[] = [ ];

  constructor(private itemService: ItemService, private route: ActivatedRoute,
    private orderService: OrderService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadItems();
    this.route.data.subscribe(data => {
      this.items = data['items'];
    });
  }

  loadItems() {
    this.itemService.getItems().subscribe(result => {
      this.items = result;
    }, error => {
      console.log(error);
    });
  }

  addItemToOrder(item: Item) {
    this.orderService.addLine(item);
    this.alertify.success('Item added');
  }
}
