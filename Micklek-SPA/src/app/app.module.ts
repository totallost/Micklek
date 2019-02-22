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
import { OrderManagementComponent } from './management/order-management/order-management.component';
import { AuthManagementComponent } from './management/auth-management/auth-management.component';
import { OrderCardComponent } from './management/order-card/order-card.component';

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
    OrderManagementComponent,
    AuthManagementComponent,
    OrderCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    ItemService,
    OrderService,
    AlertifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
