import {PayerDTO} from "./payerDTO";
import {VoucherDTO} from "./voucherDTO";
import {ServiceTaxDTO} from "./serviceTaxDTO";
import {DeliveryTaxDTO} from "./deliveryTaxDTO";

export class RequestDTO {

  constructor(
    public payersDTO: PayerDTO[],
    public serviceTaxDTO: ServiceTaxDTO,
    public deliveryTaxDTO: DeliveryTaxDTO,
    public voucherDTO: VoucherDTO,
    public totalAmount: number,
  ) {
  }
}
