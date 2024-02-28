import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { LucideAngularModule, Plus, Minus, Percent, X } from 'lucide-angular';
import {PaymentService} from "./services/payment.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ResultComponent } from './pages/result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    RestaurantsComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({Plus, Minus, Percent, X}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
