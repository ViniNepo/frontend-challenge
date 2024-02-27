import {Item} from "../item";
import {Payer} from "../payer";

export class ItemList {

  constructor(
    public payer: Payer,
    public item: Item,
    public quantity: number,
  ) {
  }
}
