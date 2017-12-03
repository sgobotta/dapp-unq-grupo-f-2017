import { Mail } from "./mail";
import { Translations } from "./i18n";
import { Currency } from "./../utils/currency/currency";

export class SaleMail extends Mail {

  constructor(to: string, text: string) {
    super(Translations.en.purchase.from, to, Translations.en.purchase.subject, text);
  }
}

export class SaleMailBuilder {

  private consignee: string;
  private menuName: string;
  private quantity: number;
  private menuDescription: string;
  private price: string;
  private deliveryPrice: string;
  private finalPrice: string;
  private deliveryTime: number;
  private deliveryType: string;

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.consignee = "";
    this.menuName = "";
    this.quantity = null;
    this.menuDescription = "";
    this.price = "";
    this.deliveryPrice = "";
    this.finalPrice = "";
    this.deliveryTime = null;
    this.deliveryType = "";
  }

  public withConsignee(consignee: string) {
    this.consignee = consignee;
    return this;
  }

  public withMenuName(menuName: string) {
    this.menuName = menuName;
    return this;
  }

  public withQuantity(quantity: number) {
    this.quantity = quantity;
    return this;
  }

  public withMenuDescription(menuDescription: string) {
    this.menuDescription = menuDescription;
    return this;
  }

  public withPrice(price: Currency) {
    this.price = `${price.currencyName} ${price.amount}`;
    return this;
  }

  public withDeliveryPrice(deliveryPrice: Currency) {
    this.deliveryPrice = `${deliveryPrice.currencyName} ${deliveryPrice.amount}`;;
    return this;
  }

  public withFinalPrice(finalPrice: Currency) {
    this.finalPrice = `${finalPrice.currencyName} ${finalPrice.amount}`;;
    return this;
  }

  public withDeliveryTime(deliveryTime: number) {
    this.deliveryTime = deliveryTime;
    return this;
  }

  public withDeliveryType(deliveryType: string) {
    this.deliveryType = deliveryType;
    return this;
  }

  private getText() {
    if (this.deliveryType === "delivery") {
      return this.getDeliveryText();
    }
    if (this.deliveryType === "pickup") {
      return this.getPickUpText();
    }
  }

  private getDeliveryText() {
    const text = Translations.en.sale.deliveryText(
      this.menuName, this.quantity, this.menuDescription, this.price,
      this.deliveryPrice, this.finalPrice, this.deliveryTime
    )
    return text;
  }

  private getPickUpText() {
    const text = Translations.en.sale.pickUpText(
      this.menuName, this.quantity, this.menuDescription, this.price,
      this.deliveryPrice, this.finalPrice, this.deliveryTime
    )
    return text;
  }

  public build() {
    const text = this.getText();
    const mail = new SaleMail(this.consignee, text);
    this.clear();
    return mail;
  }
}