import { Component, OnInit } from '@angular/core';
import { OrderManagmentService } from 'src/app/services/order-managment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHeader } from 'src/app/models/order-header';
import { Order } from 'src/app/models/order';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { OrderHeaderUpdate } from 'src/app/models/order-header-update';
import { Statuses } from 'src/app/models/statuses';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-order-details-management',
  templateUrl: './order-details-management.component.html',
  styleUrls: ['./order-details-management.component.css']
})
export class OrderDetailsManagementComponent implements OnInit {

  orderHeaders: OrderHeader;

  customerDetailsForm: FormGroup;

  orderLines: Order[];

  statuses: Statuses;

  orderHeaderUpdate: OrderHeaderUpdate = {} as any;

  items: Item[];

  constructor(private orderManagementService: OrderManagmentService, private route: ActivatedRoute,
    private alertify: AlertifyService, private router: Router, private modalService: NgbModal, private itemService: ItemService) { }

  ngOnInit() {
    this.statuses = this.orderManagementService.statuses;

    let orderNumber: number;
    this.route.params.subscribe(idNumber => {
      orderNumber = idNumber.id;
    });

    this.orderManagementService.getOrderLines(orderNumber).subscribe(data => {
      this.orderLines = data;
    }, error => {
      this.alertify.error('Unauthorized');
      this.router.navigate(['/login']);
    });

    this.orderHeaders = this.orderManagementService.getOrderHeader(orderNumber);

    if (!this.orderHeaders) {
      this.orderManagementService.getOrderHeaderFromServer(orderNumber).subscribe(result => {
        this.orderHeaders = result;
              this.orderManagementService.getStatuses().subscribe(resultStat => {
        this.statuses = resultStat;
        this.setOrderHeaderInfo();
      });
      });
    }

    this.customerDetailsForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'sureName': new FormControl(null, Validators.required),
      'mobileNumber': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'dateReady': new FormControl(null, Validators.required),
      'notes': new FormControl(null),
      'status': new FormControl(null)
    });

    this.customerDetailsForm.disable();
    if (!!this.orderHeaders) {
      this.setOrderHeaderInfo();
    }
  }

  setOrderHeaderInfo() {
    this.customerDetailsForm.setValue({
      firstName: this.orderHeaders.clientFirstName,
      sureName: this.orderHeaders.clientSureName,
      mobileNumber: this.orderHeaders.clientCell,
      email: this.orderHeaders.clientEmail,
      address: this.orderHeaders.address,
      dateReady: this.orderHeaders.dateTarget.substr(0, 10),
      notes: this.orderHeaders.clientRemarks,
      status: this.orderHeaders.statusId,
    });
    console.log(this.customerDetailsForm);
    console.log(this.orderHeaders);
  }

  changeAmount(line, amount) {
    this.orderLines[line - 1].amount = amount;
    this.totalSumCalc();
  }

  totalSumCalc() {
    this.orderHeaders.totalPrice = 0;
    for (let i = 0; this.orderLines.length > i; i++) {
      this.orderHeaders.totalPrice += this.orderLines[i].item.price * this.orderLines[i].amount;
    }
  }

  delete(line: number) {
    this.orderLines.splice(line - 1, 1);
    for (let i = 0; this.orderLines.length > i; i++) {
      this.orderLines[i].lineNumber = i + 1;
    }
    this.totalSumCalc();
  }

  onSubmit() {
    this.orderHeaderUpdate.id = +this.orderHeaders.id;
    this.orderHeaderUpdate.firstName = this.customerDetailsForm.get('firstName').value;
    this.orderHeaderUpdate.sureName = this.customerDetailsForm.get('sureName').value;
    this.orderHeaderUpdate.mobileNumber = this.customerDetailsForm.get('mobileNumber').value;
    this.orderHeaderUpdate.email = this.customerDetailsForm.get('email').value;
    this.orderHeaderUpdate.address = this.customerDetailsForm.get('address').value;
    this.orderHeaderUpdate.dateReady = this.customerDetailsForm.get('dateReady').value;
    this.orderHeaderUpdate.notes = this.customerDetailsForm.get('notes').value;
    this.orderHeaderUpdate.status = this.customerDetailsForm.get('status').value;
    // save local variable for UI
    this.orderHeaders.clientFirstName = this.customerDetailsForm.get('firstName').value;
    this.orderHeaders.clientSureName = this.customerDetailsForm.get('sureName').value;
    this.orderHeaders.clientCell = this.customerDetailsForm.get('mobileNumber').value;
    this.orderHeaders.clientEmail = this.customerDetailsForm.get('email').value;
    this.orderHeaders.address = this.customerDetailsForm.get('address').value;
    this.orderHeaders.dateTarget = this.customerDetailsForm.get('dateReady').value;
    this.orderHeaders.clientRemarks = this.customerDetailsForm.get('notes').value;
    this.orderHeaders.statusId = this.customerDetailsForm.get('status').value;

    this.orderManagementService.updateOrder(this.orderHeaderUpdate, this.orderLines).subscribe(() => {
      this.alertify.success('order sent successfuly');
      this.updateOrdersFromService(+this.orderHeaders.id, this.orderHeaders);
      this.orderManagementService.sortOrdersByStatus();
      this.router.navigate(['/orders-management']);
    }, () => {
      this.alertify.error('order failed to sent');
    });
  }

  openLg(content) {
    if (this.items === undefined) {
      this.itemService.getItems().subscribe(data => {
        this.items = data;
      });
    }
    this.modalService.open(content, { size: 'lg' });
  }

  addItemToOrder(item: Item) {
    let itemExist = false;
    for (let i = 0; this.orderLines.length > i; i++) {
      if (this.orderLines[i].item.id === item.id) {
        this.orderLines[i].amount++;
        itemExist = true;
      }
    }
    if (!itemExist) {
      const newOrderLine: Order = {
        item: item,
        amount: 1,
        lineNumber: this.orderLines.length + 1,
        orderId: this.orderHeaders.id,
        itemId: item.id
      };
      this.orderLines.push(newOrderLine);
    }
    this.totalSumCalc();



    // const newOrderLine: Order = {
    //  item: item,
    //  amount: 1,
    //  lineNumber: this.orderLines.length + 1,
    //  orderId: this.orderHeaders.id,
    //  itemId: item.id
    // };
    // this.orderLines.push(newOrderLine);
    // this.totalSumCalc();
  }

  updateOrdersFromService(id: number, orderHeaders: OrderHeader) {
    this.orderManagementService.initOrderHeaders();
  }

}
