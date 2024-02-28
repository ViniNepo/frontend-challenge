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
  links: string[] = []

  constructor(private http: HttpClient) {
  }

  createLink(requestBody: RequestDTO) {
    console.log(requestBody)
    return this.http.post<string[]>(`http://localhost:8080/api/payment/create-link`, requestBody)
  }

}
