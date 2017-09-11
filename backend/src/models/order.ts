import { DeliveryType } from "./constants/delivery-type";
import Menu from "./menu";

export class Order {

  deliveryType: DeliveryType;
  menu: Menu;
  quantity: number;
  deliveryTime: Date;

  constructor() {

  }
}
