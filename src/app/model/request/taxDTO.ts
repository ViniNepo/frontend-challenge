import {Item} from "../item";
import {Payer} from "../payer";

export class TaxDTO {

  constructor(
    public type: string,
    public amount: number
  ) {
  }
}
