import { Component, OnInit } from '@angular/core';
import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Micklek';
  collapsed = 'collapsed';
  items: Item[] = [ ];

  constructor() {}

  ngOnInit() {
  }

  tuggleSidebar() {
    this.collapsed === 'collapsed' ? this.collapsed = 'sidebar' : this.collapsed = 'collapsed';
  }
}
