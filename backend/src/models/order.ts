import { DeliveryType } from "./constants/delivery-type";
import { Menu, MenuBuilder } from "./menu";

export class Order {

  customerId: number;
  deliveryType: string;
  menu: Menu;
  quantity: number;
  deliveryTime: Date; // Date and time
  // We must validate that date is at least 48 hours from now

  constructor(customerId: number, deliveryType: string, menu: Menu, quantity: number, deliveryTime: Date) {
    this.customerId = customerId;
  	this.deliveryType = deliveryType;
  	this.menu = menu;
  	this.quantity = quantity;
  	this.deliveryTime = deliveryTime;
  }

}

export class OrderBuilder {

  customerId: number;
  deliveryType: string;
  menu: Menu;
  quantity: number;
  deliveryTime: Date;

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
    this.menu = new MenuBuilder()
      .withName(menu.name)
      .withDescription(menu.description)
      .withCategory(menu.category)
      .withCurrencyName(menu.currencyName)
      .withDeliveryPrice(menu.deliveryPrice.amount)
      .withValidityRange(menu.validityRange)
      .withDeliveryTimeRange(menu.deliveryTimeRange)
      .withPrice(menu.price.amount)
      .withMinQuantity(menu.minQuantity)
      .withMinQuantityPrice(menu.minQuantityPrice.amount)
      .withMaxDailySalesQuantity(menu.maxDailySalesQuantity)
      .withAncestors(menu.ancestors)
      .build();
    return this;
  }

  withQuantity(quantity: number) {
    this.quantity = quantity;
    return this;
  }

  withDeliveryTime(deliveryTime: Date) {
    this.deliveryTime = deliveryTime;
    return this;
  }

  build() {
    const order = new Order(this.deliveryType, this.menu, this.quantity,
      this.deliveryTime);
    this.clear();
    return order;
  }
}
