import {Item} from "./item";

export class ItemList {

  constructor(
    public id: number,
    public item: Item,
    public quantity: number,
  ) {
  }
}
