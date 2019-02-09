import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerDetailsForm: FormGroup;

  constructor() { }

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
    console.log(this.customerDetailsForm);
  }

  forbbidenDates(control: FormControl): { [s: string]: boolean } {
    if (Date.parse(control.value) < Date.now()) {
      console.log(Date.parse(control.value));
      return {'dateIsForbbiden': true};
    }
    return null;
  }

}
