import {Item} from "../item";
import {Payer} from "../payer";

export class TaxesDTO {

  constructor(
    public type: string,
    public amount: number
  ) {
  }
}
