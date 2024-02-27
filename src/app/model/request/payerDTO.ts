import {Item} from "../item";
import {Payer} from "../payer";

export class PayerDTO {

  constructor(
    public paymentMethod: string,
    public amount: number
  ) {
  }
}
