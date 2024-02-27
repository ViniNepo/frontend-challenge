import {ItemList} from "./itemList";

export class PayerList {

  constructor(
    public payer: Payer[],
  ) {
  }
}

export class Payer {

  constructor(
    public items: ItemList[],
  ) {
  }
}
