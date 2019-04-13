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
import { AuthManagementComponent } from './management/auth-management/auth-management.component';
import { OrderCardComponent } from './management/order-card/order-card.component';
import { OrderDetailsManagementComponent } from './management/order-details-management/order-details-management.component';
import { AddItemComponent } from './management/add-item/add-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    AuthManagementComponent,
    OrderCardComponent,
    OrderDetailsManagementComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    ItemService,
    OrderService,
    AlertifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
