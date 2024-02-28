import {Component, OnInit} from '@angular/core';
import {ItemList} from "../../model/itemList";
import {PaymentService} from "../../services/payment.service";
import {Payer} from "../../model/payer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestDTO} from "../../model/request/requestDTO";
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
    { text: 'Selecionar', value: 'none' },
    { text: 'PayPal', value: 'paypal' }
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
      this.form.controls['deliveryTaxType'].setValue('real')
    } else {
      this.deliveryTaxRealColor = false
      this.deliveryTaxPercentageColor = true
      this.form.controls['deliveryTaxType'].setValue('percentage')
    }

    this.calcTotalAmount()
  }

  setServiceType(type: number) {
    if (type == 1) {
      this.serviceTaxRealColor = true
      this.serviceTaxPercentageColor = false
      this.form.controls['serviceTaxType'].setValue('real')
    } else {
      this.serviceTaxRealColor = false
      this.serviceTaxPercentageColor = true
      this.form.controls['serviceTaxType'].setValue('percentage')
    }

    this.calcTotalAmount()
  }

  setCouponType(type: number) {
    if (type == 1) {
      this.couponTaxRealColor = true
      this.couponTaxPercentageColor = false
      this.form.controls['discountCouponType'].setValue('real')
    } else {
      this.couponTaxRealColor = false
      this.couponTaxPercentageColor = true
      this.form.controls['discountCouponType'].setValue('percentage')
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

    if (this.form.get('deliveryTaxType')?.value == 'real') {
      deliveryTax = this.form.get('deliveryTax')?.value
    } else if (this.form.get('deliveryTaxType')?.value == 'percentage') {
      deliveryTax = this.form.get('deliveryTax')?.value * (this.form.get('deliveryTax')?.value / 100)
    }

    if (this.form.get('serviceTaxType')?.value == 'real') {
      serviceTax = this.form.get('serviceTax')?.value
    } else if (this.form.get('serviceTaxType')?.value == 'percentage') {
      serviceTax = this.form.get('serviceTax')?.value * (this.form.get('serviceTax')?.value / 100)
    }

    if (this.form.get('discountCouponType')?.value == 'real') {
      voucher = this.form.get('discountCoupon')?.value
    } else if (this.form.get('discountCouponType')?.value == 'percentage') {
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

    let body = new RequestDTO(payersDTO, serviceTaxDTO, deliveryTaxDTO, voucherDTO, this.totalAmount)

    this.paymentService.createLink(body).subscribe(links => {
      this.paymentService.links = links
      this.router.navigate(['/result'])
    })
  }
}
