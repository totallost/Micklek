import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-card-management',
  templateUrl: './item-card-management.component.html',
  styleUrls: ['./item-card-management.component.css']
})
export class ItemCardManagementComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit() {
  }

}
