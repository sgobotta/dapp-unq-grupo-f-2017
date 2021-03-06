import { Balance, BalanceBuilder } from "./balance";

export class ProviderBalance extends Balance {

  private providerId: string;

  constructor(providerId: string, amount: number, lastAccessed: Date) {
    super(amount, lastAccessed);
    this.providerId = providerId;
  }

  public getId() {
    return this.providerId;
  }

  public deposit(amount) {
    const newAmount = this.getAmount() + parseInt(amount);
    this.setAmount(newAmount);
  }
}

export class ProviderBalanceBuilder extends BalanceBuilder {

  private providerId: string;

  constructor() {
    super();
    this.clear();
    this.amount = 0;
    this.lastAccessed = new Date;
  }

  public clear() {
    super.clear();
    this.providerId = null;
  }

  public withId(providerId: string) {
    this.providerId = providerId;
    return this;
  }

  public build() {
    const providerBalance = new ProviderBalance(this.providerId, this.amount, this.lastAccessed);
    this.clear();
    return providerBalance;
  }
}