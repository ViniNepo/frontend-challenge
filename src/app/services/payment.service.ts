import { Injectable } from '@angular/core';
import {ItemList} from "../model/itemList";
import {HttpClient} from "@angular/common/http";

import {take} from "rxjs";
import {RequestDTO} from "../model/request/requestDTO";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  selectedItems: ItemList[] = []

  constructor(private http: HttpClient) {
  }

  pay(requestBody: RequestDTO) {
    console.log('to aqui')
    return this.http.post(`http://localhost:8080/pay`, requestBody).pipe(take(1))
  }

}
