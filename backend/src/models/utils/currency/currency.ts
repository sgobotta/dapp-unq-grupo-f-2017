import { ExchangeRate } from "./exchange-rate";

export class Currency {

  currencyName: string;
  amount: number;

  constructor(currencyName: string, amount: number) {

    this.currencyName = currencyName;
    this.amount = amount;
  }

  public substract(amount: Currency) {
  	// Simple implementation with no conversion rate
  	if(this.amount - amount.getAmount() >= 0) {
      this.amount = this.amount - amount.getAmount();
  	} else {
      throw new Error("Currency ::: Can't substract below zero.")
    }
  }

  public add(currency: Currency) {
    if (this.currencyName === currency.currencyName) {
      this.amount = this.amount + currency.getAmount();
      return this.amount;
    }
    else {
      throw new Error("Currency ::: Currency names doesn't match at add");
    }
  }

  public getAmount(): number {
    return this.amount;
  }

}

export class CurrencyBuilder {

  name: string;
  amount: number;

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.name = "";
    this.amount = 0;
  }

  public withName(name: string) {
    this.name = name;
    return this;
  }

  public withAmount(amount: number) {
    this.amount = ExchangeRate.convert(this.name, amount);
    return this;
  }

  public build() {
    const currency = new Currency(this.name, this.amount);
    this.clear();
    return currency;
  }
}
