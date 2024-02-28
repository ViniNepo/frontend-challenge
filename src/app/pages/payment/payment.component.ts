import {Component, OnInit} from '@angular/core';
import {ItemList} from "../../model/itemList";
import {PaymentService} from "../../services/payment.service";
import {Payer} from "../../model/payer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PayloadRequest} from "../../model/request/PayloadRequest";
import {PayerDTO} from "../../model/request/payerDTO";
import {DeliveryTaxDTO} from "../../model/request/deliveryTaxDTO";
import {ServiceTaxDTO} from "../../model/request/serviceTaxDTO";
import {VoucherDTO} from "../../model/request/voucherDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  selectedItems: ItemList[] = []
  payers: Payer[] = []
  form: FormGroup
  backgroundButtonColor: string = 'bg-zinc-200'
  showOptions = false
  serviceTaxRealColor: boolean = false;
  serviceTaxPercentageColor: boolean = false;
  deliveryTaxRealColor: boolean = false;
  deliveryTaxPercentageColor: boolean = false;
  couponTaxRealColor: boolean = false;
  couponTaxPercentageColor: boolean = false;
  hasClientEmpty = true
  hasPaymentMethodEmpty = true
  clientSelected: number = 0
  totalAmount: number = 0
  totalAmountWithTax: number = 0
  paymentOptions = [
    { text: 'Selecionar', value: 'NONE' },
    { text: 'PayPal', value: 'PAYPAL' }
  ]

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.payers.push(new Payer("", [], 0))

    this.form = this.formBuilder.group({
      payers: [null],
      deliveryTax: [null, Validators.required],
      deliveryTaxType: [null, Validators.required],
      serviceTax: [null, Validators.required],
      serviceTaxType: [null, Validators.required],
      discountCoupon: [null, Validators.required],
      discountCouponType: [null, Validators.required],
      total: [null],
    })
  }

  ngOnInit() {
    this.selectedItems = this.paymentService.selectedItems
    this.selectedItems.forEach(item => {
      this.payers[0].items.push(item)
    })

    this.calcTotalByPayer()
  }

  addPayer() {
    this.payers.push(new Payer("", [], 0))
    this.hasClientEmpty = true
  }

  toggleShowOption(clientNumber: number) {
    this.clientSelected = clientNumber
    this.showOptions = !this.showOptions
  }

  selectItem(item: ItemList) {
    this.payers.forEach(payer => {
      for (let i = 0; i < payer.items.length; i++) {
        if (payer.items[i] == item) {
          payer.items.splice(i, 1)
        }
      }
    })

    if (!this.payers[this.clientSelected].items.find(i => i == item)) {
      this.payers[this.clientSelected].items.push(item)
    }

    this.calcTotalByPayer()

    this.toggleShowOption(0)

    this.validateList()
  }

  validateList() {
    this.payers.forEach(payer => {
      if (payer.items.length == 0) {
        this.hasClientEmpty = true
      } else {
        this.hasClientEmpty = false
      }
    })
  }

  selectPaymentMethod(method: string, index: number) {
    this.payers[index].paymentMethod = method
    this.payers.forEach(payer => {
      if (payer.paymentMethod == '') {
        this.hasPaymentMethodEmpty = true
      } else {
        this.hasPaymentMethodEmpty = false
      }
    })

    this.validateList()
  }

  setDeliveryType(type: number) {
    if (type == 1) {
      this.deliveryTaxRealColor = true
      this.deliveryTaxPercentageColor = false
      this.form.controls['deliveryTaxType'].setValue('REAL')
    } else {
      this.deliveryTaxRealColor = false
      this.deliveryTaxPercentageColor = true
      this.form.controls['deliveryTaxType'].setValue('PERCENTAGE')
    }

    this.calcTotalAmount()
  }

  setServiceType(type: number) {
    if (type == 1) {
      this.serviceTaxRealColor = true
      this.serviceTaxPercentageColor = false
      this.form.controls['serviceTaxType'].setValue('REAL')
    } else {
      this.serviceTaxRealColor = false
      this.serviceTaxPercentageColor = true
      this.form.controls['serviceTaxType'].setValue('PERCENTAGE')
    }

    this.calcTotalAmount()
  }

  setCouponType(type: number) {
    if (type == 1) {
      this.couponTaxRealColor = true
      this.couponTaxPercentageColor = false
      this.form.controls['discountCouponType'].setValue('REAL')
    } else {
      this.couponTaxRealColor = false
      this.couponTaxPercentageColor = true
      this.form.controls['discountCouponType'].setValue('PERCENTAGE')
    }
    this.calcTotalAmount()
  }

  calcTotalByPayer() {
    this.totalAmount = 0
    this.payers.forEach(payer => {
      payer.amount = 0
      payer.items.forEach(item => {
        payer.amount += (item.item.value * item.quantity)
      })
      this.totalAmount += payer.amount
    })

    this.calcTotalAmount()
  }

  calcTotalAmount() {
    let deliveryTax = 0
    let voucher = 0
    let serviceTax = 0

    if (this.form.get('deliveryTaxType')?.value == 'REAL') {
      deliveryTax = this.form.get('deliveryTax')?.value
    } else if (this.form.get('deliveryTaxType')?.value == 'PERCENTAGE') {
      deliveryTax = this.form.get('deliveryTax')?.value * (this.form.get('deliveryTax')?.value / 100)
    }

    if (this.form.get('serviceTaxType')?.value == 'REAL') {
      serviceTax = this.form.get('serviceTax')?.value
    } else if (this.form.get('serviceTaxType')?.value == 'PERCENTAGE') {
      serviceTax = this.form.get('serviceTax')?.value * (this.form.get('serviceTax')?.value / 100)
    }

    if (this.form.get('discountCouponType')?.value == 'REAL') {
      voucher = this.form.get('discountCoupon')?.value
    } else if (this.form.get('discountCouponType')?.value == 'PERCENTAGE') {
      voucher = this.form.get('discountCoupon')?.value * (this.form.get('discountCoupon')?.value / 100)
    }

    this.totalAmountWithTax = this.totalAmount + (deliveryTax) + (serviceTax) - (voucher)
  }

  submit() {
    let deliveryTax = this.form.get('deliveryTax')?.value
    let deliveryTaxType = this.form.get('deliveryTaxType')?.value
    let deliveryTaxDTO = new DeliveryTaxDTO(deliveryTaxType, deliveryTax)

    let serviceTax = this.form.get('serviceTax')?.value
    let serviceTaxType = this.form.get('serviceTaxType')?.value
    let serviceTaxDTO = new ServiceTaxDTO(serviceTaxType, serviceTax)

    let voucher = this.form.get('discountCoupon')?.value
    let voucherType = this.form.get('discountCouponType')?.value
    let voucherDTO = new VoucherDTO(voucherType, voucher)


    let payersDTO: PayerDTO[] = []

    this.payers.forEach(payer => {
      let payerDTO = new PayerDTO(payer.paymentMethod, payer.amount)
      payersDTO.push(payerDTO)
    })

    let body = new PayloadRequest(payersDTO, serviceTaxDTO, deliveryTaxDTO, voucherDTO, this.totalAmount)

    this.paymentService.createLink(body).subscribe(links => {
      console.log(links)
      this.paymentService.links = links
      this.router.navigate(['/result'])
    })
  }
}
