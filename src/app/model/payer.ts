import {ItemList} from "./itemList";

export class Payer {

  constructor(
    public paymentMethod: string,
    public items: ItemList[],
    public amount: number
  ) {
  }
}
