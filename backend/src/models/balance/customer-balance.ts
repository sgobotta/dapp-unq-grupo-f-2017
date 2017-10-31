import { Balance, BalanceBuilder } from "./balance";

class CustomerBalance extends Balance {

  private customerId: number;

  constructor(customerId: number, amount: number, lastAccessed: Date) {
    super(amount, lastAccessed);
    this.customerId = customerId;
  }

  public getId() {
    return this.customerId;
  }

}

export class CustomerBalanceBuilder extends BalanceBuilder {

  private customerId: number;

  constructor() {
    super();
    this.clear();
  }

  public clear() {
    super.clear();
    this.customerId = null;
  }

  public withId(customerId: number) {
    this.customerId = customerId;
    return this;
  }

  public build() {
    const customerBalance = new CustomerBalance(this.customerId, this.amount, this.lastAccessed);
    this.clear();
    return customerBalance;
  }

}