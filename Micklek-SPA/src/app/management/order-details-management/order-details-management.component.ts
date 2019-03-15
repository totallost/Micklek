import { Component, OnInit } from '@angular/core';
import { OrderManagmentService } from 'src/app/services/order-managment.service';
import { ActivatedRoute } from '@angular/router';
import { OrderHeader } from 'src/app/models/order-header';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-details-management',
  templateUrl: './order-details-management.component.html',
  styleUrls: ['./order-details-management.component.css']
})
export class OrderDetailsManagementComponent implements OnInit {
  orderHeaders: OrderHeader;
  customerDetailsForm: FormGroup;
  constructor(private orderManagementService: OrderManagmentService, private route: ActivatedRoute) { }

  ngOnInit() {
    let orderNumber: number;
    this.route.params.subscribe(idNumber => {
      orderNumber = idNumber.id;
    });
    this.orderHeaders = this.orderManagementService.getOrderHeader(orderNumber);

    this.customerDetailsForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'sureName': new FormControl(null, Validators.required),
      'mobileNumber': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'dateReady': new FormControl(null, [Validators.required, this.forbbidenDates]),
      'notes': new FormControl(null),
    });

    this.customerDetailsForm.disable();
    this.setOrderHeaderInfo();
  }

  forbbidenDates(control: FormControl): { [s: string]: boolean } {
    if (Date.parse(control.value) < Date.now()) {
      return {'dateIsForbbiden': true};
    }
    return null;
  }

  setOrderHeaderInfo() {
    this.customerDetailsForm.setValue({
      firstName: this.orderHeaders.clientFirstName,
      sureName: this.orderHeaders.clientSureName,
      mobileNumber: this.orderHeaders.clientCell,
      email: this.orderHeaders.clientEmail,
      address: 'MISSING',
      dateReady: this.orderHeaders.dateTarget,
      notes: this.orderHeaders.clientRemarks,
    });
  }

  onSubmit() {

  }

}
