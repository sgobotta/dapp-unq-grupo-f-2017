import { Wove } from "aspect.js";
import { inject, injectable } from "inversify";
import { MySQLClient } from "../config/mysql/client";
import TYPES from "./../constants/types";
import { ProviderBalanceBuilder } from "./../models/balance/provider-balance";
import { CustomerBalanceBuilder } from "./../models/balance/customer-balance";

@injectable()
@Wove()
export class BalanceService {

  private mySqlClient: MySQLClient;
  private providerCollection: string;
  private customerCollection: string;

  constructor(
    @inject(TYPES.MySQLClient) mySqlClient: MySQLClient
  ) {
      this.mySqlClient = mySqlClient;
      this.providerCollection = "ProviderBalance";
      this.customerCollection = "CustomerBalance";
  }

  public getProviderBalanceByEmail(providerId: string, callback) {
    let balance;
    this.mySqlClient.findOneByProperty(this.providerCollection, { providerId: providerId }, (err, res) => {
      let provider = res[0];
      if (err) throw err;
      else if (provider !== undefined) {
        balance = new ProviderBalanceBuilder()
          .withId(provider.providerId)
          .withAmount(provider.amount)
          .build();
        callback({ success: true, balance });
        return;
      }
      callback({ success: false });
    });
  }

  public updateProviderBalanceByEmail(providerId: string, amount: number, callback) {
    this.depositToProviderBalanceByEmail(providerId, amount, callback);
  }

  public getCustomerBalanceByCUIT(customerId: number, callback) {
    let balance;
    this.mySqlClient.findOneByProperty(this.customerCollection, { customerId: customerId }, (err, res) => {
      let customer = res[0];
      if (err) throw err;
      else if (customer !== undefined) {
        balance = new CustomerBalanceBuilder()
          .withId(customer.customerId)
          .withAmount(customer.amount)
          .build();
          callback({ success: true, balance });
          return;
      }
        callback({ success: false });
    });
  }

  public updateCustomerBalanceByCUIT(customerId: number, amount: number, callback) {
    this.extractFromCustomerBalanceByCUIT(customerId, amount, callback);
  }

  public newProviderBalance(providerId: string, callback) {
    this.getProviderBalanceByEmail(providerId, (query) => {
      if (!query.success) {
        let balance = new ProviderBalanceBuilder()
        .withId(providerId)
        .build();
        this.mySqlClient.insertOne(this.providerCollection, balance, (err, res) => {
          if (err) throw err;
          if (res.affectedRows) {
            callback({ success: true, balance });
          }
          else {
            callback({ success: false });
          }
        });
      }
      else {
        callback({ succes: false, msg: "Provider id already exists."});
      }
    });
  }

  public newCustomerBalance(customerId: number, callback) {
    this.getCustomerBalanceByCUIT(customerId, (query) => {
      if (!query.success) {
        let balance = new CustomerBalanceBuilder()
        .withId(customerId)
        .build();
        this.mySqlClient.insertOne(this.customerCollection, balance, (err, res) => {
          if (err) throw err;
          if (res.affectedRows) {
            callback({ success: true, balance });
          }
          else {
            callback({ success: false });
          }
        });
      }
      else {
        callback({ succes: false, msg: "Customer id already exists."});
      }
    });
  }

  private depositToProviderBalanceByEmail(providerId: string, amount: number, callback) {
    this.getProviderBalanceByEmail(providerId, (query) => {
      if (query.success) {
        const balance = query.balance;
        balance.deposit(amount);
        this.mySqlClient.updateOneByProperty(this.providerCollection, { providerId: balance.providerId, amount: balance.amount }, (err, res) => {
          if (err) throw err;
          if (res.affectedRows & res.changedRows) {
            callback({ success: true, balance });
          }
          else {
            callback({ success: false });
          }
        });
      }
    });
  }

  private extractFromCustomerBalanceByCUIT(customerId: number, amount: number, callback) {
    this.getCustomerBalanceByCUIT(customerId, (query) => {
      if (query.success) {
        const balance = query.balance;
        balance.extract(amount);
        this.mySqlClient.updateOneByProperty(this.customerCollection, { customerId: balance.customerId, amount: balance.amount }, (err, res) => {
          if (err) throw err;
          if (res.affectedRows & res.changedRows) {
            callback({ success: true, balance });
          }
          else {
            callback({ success: false });
          }
        });
      }
    });
  }

}