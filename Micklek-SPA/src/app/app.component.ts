import { Component, OnInit } from '@angular/core';
import { Item } from './models/item';
import { ItemService } from './services/item.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './services/order.service';
import { AlertifyService } from './services/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Micklek';
  collapsed = 'collapsed';
  items: Item[] = [ ];

  constructor(private itemService: ItemService, private route: ActivatedRoute,
    private orderService: OrderService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.loadItems();
     this.route.data.subscribe(data => {
       this.items = data['items'];
     });
  }

  tuggleSidebar() {
    this.collapsed === 'collapsed' ? this.collapsed = 'sidebar' : this.collapsed = 'collapsed';
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
