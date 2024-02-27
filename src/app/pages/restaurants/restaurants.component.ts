import {Component} from '@angular/core';
import {ItemList} from "../../model/itemList";
import {PaymentService} from "../../services/payment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {

  saltItems: ItemList[] = [
    {id: 1, item: {id: 1, name: "Carbonara ao molho branco com picanha", image: "s1.png", value: 55.0}, quantity: 0},
    {id: 2, item: {id: 2, name: "Polenta ao molho ragu", image: "s2.png", value: 45.0}, quantity: 0},
    {id: 3, item: {id: 3, name: "Salada de macarrão ao molho pesto", image: "s3.png", value: 40.0}, quantity: 0},
    {id: 4, item: {id: 4, name: "Penne ao sugo", image: "s4.png", value: 30.0}, quantity: 0},
    {id: 5, item: {id: 5, name: "Pizza maguerita", image: "s5.png", value: 38.0}, quantity: 0},
    {id: 6, item: {id: 6, name: "Espaguete ao molho bolonhesa", image: "s6.png", value: 30.0}, quantity: 0},
    {id: 7, item: {id: 7, name: "Tortei 4 queijos ao mhor sugo", image: "s7.png", value: 42.0}, quantity: 0},
    {id: 8, item: {id: 8, name: "Lasanha bolonhesa individual", image: "s8.png", value: 38.0}, quantity: 0},
    {id: 9, item: {id: 9, name: "Burrata italiana a moda da casa", image: "s9.png", value: 35.0}, quantity: 0}
  ]
  sweetItems: ItemList[] = [
    {id: 1, item: {id: 1, name: "Mouse de morango e ninho", image: "d1.png", value: 9.0}, quantity: 0},
    {id: 1, item: {id: 2, name: "Canole de gotas de chocolate e nutella", image: "d2.png", value: 12.0}, quantity: 0},
    {id: 1, item: {id: 3, name: "Bownie Laka com sorvete de creme", image: "d3.png", value: 18.0}, quantity: 0},
    {id: 1, item: {id: 4, name: "Bolo nevado de chocolate branco", image: "d4.png", value: 8.0}, quantity: 0},
    {id: 1, item: {id: 5, name: "Cheese cake de morango (promoção)", image: "d5.png", value: 2.0}, quantity: 0}
  ]

  selectedItems: ItemList[] = []
  kartCount: number = 0

  constructor(
    private paymentService: PaymentService,
    private router: Router,
  ) {
  }

  addItem(item: ItemList) {
    item.quantity++
    this.kartCount++
  }

  subtractItem(item: ItemList) {
    item.quantity--
    this.kartCount--
  }

  sendSelectItemsToPayment() {
    this.saltItems.forEach(item => {
      if (item.quantity > 0) {
        this.selectedItems.push(item)
      }
    })

    this.sweetItems.forEach(item => {
      if (item.quantity > 0) {
        this.selectedItems.push(item)
      }
    })

    this.paymentService.selectedItems = this.selectedItems
    this.router.navigate(['/payment'])
  }

}
