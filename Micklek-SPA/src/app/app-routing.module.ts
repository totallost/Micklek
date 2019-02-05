import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    // canActivate: [authGard],
    children: [
      { path: 'checkout', component: CheckoutComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
