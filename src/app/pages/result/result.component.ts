import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  links: string[] = []

  constructor(
    private paymentService: PaymentService,
  ) {
  }

  ngOnInit() {
    this.links = this.paymentService.links
  }

}
