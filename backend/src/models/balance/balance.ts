
export class Balance {

  private amount: number;
  private lastAccessed: Date;

  constructor(amount: number, lastAccesed: Date) {
    this.amount = amount;
    this.lastAccessed = lastAccesed;
  }

  public getAmount() {
    return this.amount;
  }

  public setAmount(amount: number) {
    this.amount = amount;
  }

  public getLastAccesed() {
    return this.lastAccessed;
  }
}

export class BalanceBuilder {

  protected amount: number;
  protected lastAccessed: Date;

  constructor() {
    this.clear();
    this.amount = 0;
    this.lastAccessed = new Date;
    return this;
  }

  public clear() {
    this.amount = null;
    this.lastAccessed = null;
  }

  public withAmount(amount: number) {
    this.amount = amount;
    return this;
  }
}