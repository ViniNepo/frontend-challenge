import {Item} from "../item";
import {Payer} from "../payer";

export class VoucherDTO {

  constructor(
    public taxTypeEnum: string,
    public amount: number
  ) {
  }
}
