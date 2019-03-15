import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { OrderService } from '../services/order.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerDetailsForm: FormGroup;
  customer: Customer;

  constructor(private orderService: OrderService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.customerDetailsForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'sureName': new FormControl(null, Validators.required),
      'mobileNumber': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'dateReady': new FormControl(null, [Validators.required, this.forbbidenDates]),
      'notes': new FormControl(null),
    });
  }

  onSubmit() {
    this.customer = {
      firstName: this.customerDetailsForm.get('firstName').value,
      sureName: this.customerDetailsForm.get('sureName').value,
      mobileNumber: this.customerDetailsForm.get('mobileNumber').value,
      email: this.customerDetailsForm.get('email').value,
      address: this.customerDetailsForm.get('address').value,
      dateReady: this.customerDetailsForm.get('dateReady').value,
      notes: this.customerDetailsForm.get('notes').value
    };

    this.orderService.postOrderInfo(this.customer).subscribe(() => {
      this.customerDetailsForm.reset();
      this.alertify.success('order sent successfuly');
      this.router.navigate(['/Done']);
      this.orderService.reset();
    }, () => {
      this.alertify.error('order failed to sent');
    });
  }

  forbbidenDates(control: FormControl): { [s: string]: boolean } {
    if (Date.parse(control.value) < Date.now()) {
      return {'dateIsForbbiden': true};
    }
    return null;
  }

}
