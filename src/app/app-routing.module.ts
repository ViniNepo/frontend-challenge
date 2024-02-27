import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestaurantsComponent} from "./pages/restaurants/restaurants.component";
import {PaymentComponent} from "./pages/payment/payment.component";

const routes: Routes = [
  {path: '', component: RestaurantsComponent},
  {path: 'restaurant', component: RestaurantsComponent},
  {path: 'payment', component: PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
