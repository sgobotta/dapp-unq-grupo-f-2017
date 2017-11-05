import { inject, injectable } from "inversify";
import { MySQLClient } from "../config/mysql/client";
import { Runner } from "../config/mysql/runner";
import TYPES from "./../constants/types";
import { ProviderBalanceBuilder } from "./../models/balance/provider-balance";
import { CustomerBalanceBuilder } from "./../models/balance/customer-balance";

@injectable()
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
    return Runner.runInSession(() => {
      let balance;
      this.mySqlClient.findOneByProperty(this.providerCollection, { providerId: providerId }, (err, res) => {
        let provider = res[0];
        if (err) throw err;
        else if (provider !== undefined) {
          balance = new ProviderBalanceBuilder()
            .withId(provider.providerId)
            .withAmount(provider.amount)
            .withLastAccessDate(provider.lastAccessed)
            .build();
          callback({ success: true, balance });
          return;
        }
        callback({ success: false });
      });
    });
  }

  public updateProviderBalanceByEmail(providerId: string, amount: number, callback) {
    this.depositToProviderBalanceByEmail(providerId, amount, callback);
  }

  public getCustomerBalanceByCUIT(customerId: number, callback) {
    return Runner.runInSession(() => {
      let balance;
      this.mySqlClient.findOneByProperty(this.customerCollection, { customerId: customerId }, (err, res) => {
        let customer = res[0];
        if (err) throw err;
        else if (customer !== undefined) {
          balance = new CustomerBalanceBuilder()
            .withId(customer.customerId)
            .withAmount(customer.amount)
            .withLastAccessDate(customer.lastAccessed)
            .build();
            callback({ success: true, balance });
            return;
        }
          callback({ success: false });
      });
    });
  }

  public updateCustomerBalanceByCUIT(customerId: number, amount: number, callback) {
    // TODO
  }

  public newBalance(id: any, callback) {
    // TODO
  }

  private depositToProviderBalanceByEmail(providerId: string, amount: number, callback) {
    return Runner.runInSession(() => {
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
    });
  }

}