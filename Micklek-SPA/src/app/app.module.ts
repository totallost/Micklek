import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { NavComponent } from './nav/nav.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemService } from './services/item.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './services/order.service';
import { AlertifyService } from './services/alertify.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDoneComponent } from './order-done/order-done.component';
import { OrdersManagementComponent } from './management/orders-management/orders-management.component';
import { OrderCardComponent } from './management/order-card/order-card.component';
import { OrderDetailsManagementComponent } from './management/order-details-management/order-details-management.component';
import { AddItemComponent } from './management/add-item/add-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { OrderManagmentService } from './services/order-managment.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TestComponent } from './management/test/test.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    OrderPanelComponent,
    NavComponent,
    ItemCardComponent,
    CheckoutComponent,
    ShopComponent,
    CustomerDetailsComponent,
    OrderDoneComponent,
    OrdersManagementComponent,
    OrderCardComponent,
    OrderDetailsManagementComponent,
    AddItemComponent,
    LoginComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5001'],
        blacklistedRoutes: ['localhost:5001/api/auth']
      }
    })
  ],
  providers: [
    ItemService,
    OrderService,
    AlertifyService,
    OrderManagmentService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
