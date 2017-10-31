import { inject, injectable } from "inversify";
import { MySQLClient } from "../config/mysql/client";
import { Runner } from "../config/mysql/runner";
import TYPES from "./../constants/types";
import { ProviderBalanceBuilder } from "./../models/balance/provider-balance";

@injectable()
export class BalanceService {

  private mySqlClient: MySQLClient;
  private collection: string;

  constructor(
    @inject(TYPES.MySQLClient) mySqlClient: MySQLClient
  ) {
      this.mySqlClient = mySqlClient;
      this.collection = "ProviderBalance";
  }

  public getProviderBalanceByEmail(providerId: string, response) {
    return Runner.runInSession(() => {
      let balance;
      this.mySqlClient.findOneByProperty(this.collection, { providerId: providerId }, (err, res) => {
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
    //TODO
  }

  public getCustomerBalanceByCUIT(customerId: number, response) {
    //TODO
  }

  public updateCustomerBalanceByCUIT(customerId: number, amount: number, response) {
    //TODO
  }

  public newBalance(id: any, response) {
    //TODO
  }

}