import {Item} from "../item";
import {Payer} from "../payer";

export class VoucherDTO {

  constructor(
    public type: string,
    public amount: number
  ) {
  }
}
