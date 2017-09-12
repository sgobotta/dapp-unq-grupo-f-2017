import Currency from "./utils/currency";

export class EPurse {

  balance: Currency;

  constructor(amount: Currency) {
    this.balance = amount;
  }


  public withdraw(amount) {
   	this.balance.substract(amount);
  }

  public deposit(amount) {
  	this.balance.add(amount);
  }

}
