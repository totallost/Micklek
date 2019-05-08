import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @Input() item: Item;
  itemsForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.itemsForm = new FormGroup({
      'name': new FormControl(),
      'price': new FormControl(),
      'description': new FormControl(),
      'active': new FormControl()
    });

    this.setFormsValues();
  }

  setFormsValues() {
    this.itemsForm.setValue({
      name: this.item.name,
      price: this.item.price,
      description: this.item.description,
      active: this.item.isActive
    });
  }

  onSubmit() {

  }

}
