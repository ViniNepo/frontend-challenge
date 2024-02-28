import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestaurantsComponent} from "./pages/restaurants/restaurants.component";
import {PaymentComponent} from "./pages/payment/payment.component";
import {ResultComponent} from "./pages/result/result.component";

const routes: Routes = [
  {path: '', component: ResultComponent},
  {path: 'restaurant', component: RestaurantsComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'result', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
