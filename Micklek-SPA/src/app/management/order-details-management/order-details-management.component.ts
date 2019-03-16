import { Component, OnInit } from '@angular/core';
import { OrderManagmentService } from 'src/app/services/order-managment.service';
import { ActivatedRoute } from '@angular/router';
import { OrderHeader } from 'src/app/models/order-header';
import { Order } from 'src/app/models/order';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-details-management',
  templateUrl: './order-details-management.component.html',
  styleUrls: ['./order-details-management.component.css']
})
export class OrderDetailsManagementComponent implements OnInit {
  orderHeaders: OrderHeader;
  customerDetailsForm: FormGroup;
  orderLines: Order[];
  constructor(private orderManagementService: OrderManagmentService, private route: ActivatedRoute) { }

  ngOnInit() {
    let orderNumber: number;
    this.route.params.subscribe(idNumber => {
      orderNumber = idNumber.id;
    });

    this.orderManagementService.getOrderLines(orderNumber).subscribe(data => {
      this.orderLines = data;
    });

    this.orderHeaders = this.orderManagementService.getOrderHeader(orderNumber);

    this.customerDetailsForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'sureName': new FormControl(null, Validators.required),
      'mobileNumber': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'dateReady': new FormControl(null, Validators.required),
      'notes': new FormControl(null),
    });

    this.customerDetailsForm.disable();
    this.setOrderHeaderInfo();
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
    });
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
    this.totalSumCalc()
  }

  onSubmit() {

  }

}
