import {PayerDTO} from "./payerDTO";
import {TaxDTO} from "./taxDTO";
import {VoucherDTO} from "./voucherDTO";

export class RequestDTO {

  constructor(
    public payer: PayerDTO[],
    public taxes: TaxDTO[],
    public voucher: VoucherDTO,
    public totalAmount: number,
  ) {
  }
}
