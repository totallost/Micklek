import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ItemsManagementComponent } from '../items-management/items-management.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @Input() item: Item;
  itemsForm: FormGroup;

  constructor(private itemService: ItemService, private alertify: AlertifyService, private itemsManagement: ItemsManagementComponent,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.itemsForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
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

  onSubmit(item: Item) {
    item.name = this.itemsForm.get('name').value;
    item.price = this.itemsForm.get('price').value;
    item.description = this.itemsForm.get('description').value;
    item.isActive = this.itemsForm.get('active').value;

    if (item.id === 0) {
      this.itemService.addNewItem(item).subscribe(result => {
        this.alertify.success('Item was Added Successfully');
        item.id = +result.id;
        this.itemsManagement.items.push(item);
      }, error => {
        this.alertify.error('Error Adding Item');
      });
    } else {
      this.itemService.updateItemDetails(item.id.toString(), item).subscribe(result => {
        this.alertify.success('Item Updated Successfully');
        this.modalService.dismissAll();
      }, error => {
        console.log(error);
        this.alertify.error('Error Updating Item');
      });
    }


  }

  fileChange(event, item) {
    item.photoUrl = '../../assets/images/giphy.gif';
    console.log('inFileChange');
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('itemId', item.id.toString());
      formData.append('photoForCreationDto', file, file.name);
      this.itemService.uploadPhoto(formData).subscribe(result => {
       item.photoUrl = result;
      }, error => {
        console.log(error);
      });
    }
  }

  deletePhoto(id: number, item: Item) {
    this.itemService.deleteItemPhoto(id.toString()).subscribe(resault => {
      console.log(resault);
      item.photoUrl = '../../assets/images/logo.png';
      console.log('photo has been deleted');
    }, error => {
      console.log('fail to delete photo');
    });
  }

}
