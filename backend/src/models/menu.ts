import { Currency, CurrencyBuilder } from "./utils/currency/currency";
import { Availability } from "./utils/availability";

export class Menu {

  name: string;
  description: string;
  category: [string];
  currencyName: string;
  deliveryPrice: Currency;
  validityRange: [Date];
  deliveryTimeRange: Availability;
  price: Currency;
  minQuantity: number;
  minQuantityPrice: Currency;
  maxDailySalesQuantity: number;
  ancestors: [string];

  constructor(name: string, description: string, category: [string],
    deliveryPrice: Currency, validityRange: [Date], deliveryTimeRange: Availability,
    price: Currency, minQuantity: number, minQuantityPrice: Currency,
    maxDailySalesQuantity: number, ancestors: [string]) {

    this.name = name;
    this.description = description;
    this.category = category;
    this.deliveryPrice = deliveryPrice;
    this.validityRange = validityRange;
    this.deliveryTimeRange = deliveryTimeRange;
    this.price = price;
    this.minQuantity = minQuantity;
    this.minQuantityPrice = minQuantityPrice;
    this.maxDailySalesQuantity = maxDailySalesQuantity;
    this.ancestors = ancestors;
  }
}

export class MenuBuilder {
  name: string;
  description: string;
  category: [string];
  currencyName: string;
  deliveryPrice: Currency;
  validityRange: [Date];
  deliveryTimeRange: Availability;
  price: Currency;
  minQuantity: number;
  minQuantityPrice: Currency;
  maxDailySalesQuantity: number;
  ancestors: [string];

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.name = "";
    this.description = "";
    this.category = null;
    this.currencyName = "";
    this.deliveryPrice = null;
    this.validityRange = null;
    this.deliveryTimeRange = null;
    this.price = null;
    this.minQuantity = 0;
    this.minQuantityPrice = null;
    this.maxDailySalesQuantity = 0;
    this.ancestors = null;
  }

  public withName(name: string) {
    this.name = name;
    return this;
  }

  public withDescription(description: string) {
    this.description = description;
    return this;
  }

  public withCategory(category: [string]) {
    this.category = category;
    return this;
  }

  public withCurrencyName(currencyName: string) {
    this.currencyName = currencyName;
    return this;
  }

  public withDeliveryPrice(amount: number) {
    this.deliveryPrice = new CurrencyBuilder()
      .withName(this.currencyName)
      .withAmount(amount)
      .build();
    return this;
  }

  public withValidityRange(validityRange: [Date]) {
    this.validityRange = validityRange;
    return this;
  }

  public withDeliveryTimeRange(deliveryTimeRange: Availability) {
    this.deliveryTimeRange = deliveryTimeRange;
    return this;
  }

  public withPrice(amount: number) {
    this.price = new CurrencyBuilder()
      .withName(this.currencyName)
      .withAmount(amount)
      .build();
    return this;
  }

  public withMinQuantity(amount: number) {
    this.minQuantity = amount;
    return this;
  }

  public withMinQuantityPrice(amount: number) {
    this.minQuantityPrice = new CurrencyBuilder()
      .withName(this.currencyName)
      .withAmount(amount)
      .build();
    return this;
  }

  public withMaxDailySalesQuantity(maxDailySalesQuantity: number) {
    this.maxDailySalesQuantity = maxDailySalesQuantity;
    return this;
  }

  public withAncestors(ancestors: [string]) {
    this.ancestors = ancestors;
    return this;
  }

  public build() {
    const menu = new Menu(this.name, this.description, this.category,
      this.deliveryPrice, this.validityRange, this.deliveryTimeRange,
      this.price, this.minQuantity, this.minQuantityPrice,
      this.maxDailySalesQuantity, this.ancestors);
      this.clear();
    return menu;
  }
}
