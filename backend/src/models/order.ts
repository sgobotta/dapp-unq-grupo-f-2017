import { DeliveryType } from "./constants/delivery-type";
import Menu from "./menu";

export class Order {

  deliveryType: DeliveryType;
  menu: Menu;
  quantity: number;
  deliveryTime: Date; // Date and time
  // We must validate that date is at least 48 hours from now

  constructor(deliveryType : DeliveryType, menu : Menu, quantity : number, deliveryTime: Date) {
  	this.deliveryType = deliveryType;
  	this.menu = menu;
  	this.quantity = quantity;
  	this.deliveryTime = deliveryTime;
  }
  
}
