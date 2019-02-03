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

@NgModule({
  declarations: [
    AppComponent,
    OrderPanelComponent,
    NavComponent,
    ItemCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ItemService,
    OrderService,
    AlertifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
