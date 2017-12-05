import { DeliveryType } from "./constants/delivery-type";
import { Menu, MenuBuilder } from "./menu";
import { Currency, CurrencyBuilder } from "./utils/currency/currency";

export class Order {

  customerId: number;
  deliveryType: string;
  menu: Menu;
  quantity: number;
  deliveryTime: number;
  date: Date;
  finalPrice: Currency;

  constructor(customerId: number, deliveryType: string, menu: Menu, quantity: number, deliveryTime: number, date: Date) {
    this.customerId = customerId;
  	this.deliveryType = deliveryType;
  	this.menu = menu;
  	this.quantity = quantity;
  	this.deliveryTime = deliveryTime;
    this.date = date;
    this.finalPrice = this.calculateFinalPrice();
  }

  private calculateFinalPrice() {
    const menuPrice: Currency = this.menu.price
    this.finalPrice = Object.create(this.menu.price);
    if (this.deliveryType === "delivery") {
      const deliveryPrice:Currency = this.menu.deliveryPrice;
      this.finalPrice.mul(this.quantity);
      return this.finalPrice;
    }
    if (this.deliveryType === "pickup") {
      this.finalPrice.mul(this.quantity);
      return this.finalPrice;
    }
  }

  public getFinalPrice() {
    return this.finalPrice;
  }

}

export class OrderBuilder {

  customerId: number;
  deliveryType: string;
  menu: Menu;
  quantity: number;
  deliveryTime: number;

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.customerId = null;
    this.deliveryType = null;
    this.menu = null;
    this.quantity = null;
    this.deliveryTime = null;
  }

  withCustomerId(cuit: number) {
    this.customerId = cuit;
    return this;
  }

  withDeliveryType(deliveryType: string) {
    this.deliveryType = deliveryType;
    return this;
  }

  withMenu(menu: Menu) {
    this.menu = menu;
    return this;
  }

  withQuantity(quantity: number) {
    this.quantity = quantity;
    return this;
  }

  withDeliveryTime(deliveryTime: number) {
    this.deliveryTime = deliveryTime;
    return this;
  }

  build() {
    const order = new Order(this.customerId, this.deliveryType, this.menu, this.quantity,
      this.deliveryTime, new Date());
    this.clear();
    return order;
  }
}
