import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  totalItems = 0;

  constructor(private appComponent: AppComponent, private orderService: OrderService, 
    private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.totalItems = 0;
    this.orderService.orderLines.subscribe(orders => {
      this.totalItems = 0;
      for (let i = 0; orders.length > i; i++) {
        this.totalItems += orders[i].amount;
      }
    });
  }

  collapse() {
    this.appComponent.tuggleSidebar();
  }

  loggedin() {
    return this.auth.loggedIn();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
