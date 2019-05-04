import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-items-management',
  templateUrl: './items-management.component.html',
  styleUrls: ['./items-management.component.css']
})
export class ItemsManagementComponent implements OnInit {
  items: Item[];
  chosenItem: Item;


  constructor(private itemService: ItemService, private modalService: NgbModal) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe(items => {
      this.items = items;
      console.log(items);
    });
  }

  check() {
    console.log('hi');
  }

  openEditItem(content, item: Item) {
    this.chosenItem = item;
    this.modalService.open(content, { size: 'lg' });
  }

}
