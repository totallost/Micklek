import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { OrderDoneComponent } from './order-done/order-done.component';
import { OrdersManagementComponent } from './management/orders-management/orders-management.component';
import { OrderDetailsManagementComponent } from './management/order-details-management/order-details-management.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TestComponent } from './management/test/test.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  { path: 'checkout', component: CheckoutComponent },
  { path: 'details', component: CustomerDetailsComponent },
  { path: 'Done', component: OrderDoneComponent},
  { path: 'login', component: LoginComponent},
  { path: 'test', component: TestComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'orders-management', component: OrdersManagementComponent},
      { path: 'orders-management/:id', component: OrderDetailsManagementComponent},
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
