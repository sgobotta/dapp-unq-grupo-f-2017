import { Balance, BalanceBuilder } from "./balance";

class ProviderBalance extends Balance {

  private providerId:string;

  constructor(providerId: string, amount: number, lastAccessed: Date) {
    super(amount, lastAccessed);
    this.providerId = providerId;
  }

  public getId() {
    return this.providerId;
  }

}

export class ProviderBalanceBuilder extends BalanceBuilder {

  private providerId:string;

  constructor() {
    super();
    this.clear();
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