import { Injectable } from '@angular/core';
import {ItemList} from "../model/itemList";
import {HttpClient} from "@angular/common/http";

import {take} from "rxjs";
import {PayloadRequest} from "../model/request/PayloadRequest";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  selectedItems: ItemList[] = []
  links: string[] = []

  constructor(private http: HttpClient) {
  }

  createLink(requestBody: PayloadRequest) {
    return this.http.post<string[]>(`http://localhost:8080/api/payment/create-link`, requestBody)
  }

}
