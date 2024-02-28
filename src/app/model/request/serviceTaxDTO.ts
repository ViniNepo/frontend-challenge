import {Item} from "../item";
import {Payer} from "../payer";

export class ServiceTaxDTO {

  constructor(
    public taxTypeEnum: string,
    public amount: number
  ) {
  }
}
