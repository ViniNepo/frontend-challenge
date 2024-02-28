import {Item} from "../item";
import {Payer} from "../payer";

export class DeliveryTaxDTO {

  constructor(
    public taxTypeEnum: string,
    public amount: number
  ) {
  }
}
