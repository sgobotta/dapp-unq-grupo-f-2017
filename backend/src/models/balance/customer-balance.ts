import { Balance, BalanceBuilder } from "./balance";

export class CustomerBalance extends Balance {

  private customerId: number;

  constructor(customerId: number, amount: number, lastAccessed: Date) {
    super(amount, lastAccessed);
    this.customerId = customerId;
  }

  public getId() {
    return this.customerId;
  }

  public extract(amount) {
    const currentAmount = this.getAmount();
    const extraction = currentAmount - parseInt(amount);
    if (extraction >= 0) {
      this.setAmount(extraction);
      return true
    }
    else {
      return false
    }
  }
}

export class CustomerBalanceBuilder extends BalanceBuilder {

  private customerId: number;

  constructor() {
    super();
    this.clear();
    this.amount = 0;
    this.lastAccessed = new Date;
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