import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { OrderDoneComponent } from './order-done/order-done.component';
import { OrderManagementComponent } from './management/order-management/order-management.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    // canActivate: [authGard],
    children: [
      { path: 'checkout', component: CheckoutComponent },
      { path: 'details', component: CustomerDetailsComponent },
      { path: 'Done', component: OrderDoneComponent},
      { path: 'order-management', component: OrderManagementComponent}
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
