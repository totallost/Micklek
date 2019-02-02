import { Component, OnInit } from '@angular/core';
import { Item } from './models/item';
import { ItemService } from './services/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Micklek';
  collapsed = 'collapsed';
  items: Item[];

  constructor(private itemService: ItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.items = data['items'];
    });
  }

  tuggleSidebar() {
    this.collapsed === 'collapsed' ? this.collapsed = 'sidebar' : this.collapsed = 'collapsed';
  }
}
