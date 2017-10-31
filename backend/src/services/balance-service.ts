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

  public getProviderBalanceByEmail(providerId: string, response) {
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
          response.send({ success: true, balance });
          return;
        }
        response.send({ success: false });
      });
    });
  }

  public updateProviderBalanceByEmail(providerId: string, amount: number, response) {
    // TODO
  }

  public getCustomerBalanceByCUIT(customerId: number, response) {
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
          response.send({ success: true, balance });
          return;
        }
        response.send({ success: false });
      });
    });
  }

  public updateCustomerBalanceByCUIT(customerId: number, amount: number, response) {
    // TODO
  }

  public newBalance(id: any, response) {
    // TODO
  }

}