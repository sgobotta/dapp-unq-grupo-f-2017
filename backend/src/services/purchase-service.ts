import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { CustomerService } from "./customer-service";
import { MenuService } from "./menu-service";
import { BalanceService } from "./balance-service";
import { OrderService } from "./order-service";
import { MailingService } from "./mailing-service";
import { Order, OrderBuilder } from "./../models/order";
import { Menu, MenuBuilder } from "./../models/menu";
import { Customer } from "./../models/customer";
import { CustomerBalance } from "./../models/balance/customer-balance";
import { ProviderBalance } from "./../models/balance/provider-balance";
import TYPES from "./../constants/types";
import { Wove } from "aspect.js";

@Wove()
@injectable()
export class PurchaseService {
  private mongoClient: MongoDBClient;
  private customerService: CustomerService;
  private menuService: MenuService;
  private balanceService: BalanceService;
  private mailingService: MailingService;
  private collection: string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
    @inject(TYPES.CustomerService) customerService: CustomerService,
    @inject(TYPES.MenuService) menuService: MenuService,
    @inject(TYPES.BalanceService) balanceService: BalanceService,
    @inject(TYPES.MailingService) mailingService: MailingService
  ) {
    this.mongoClient = mongoClient;
    this.customerService = customerService;
    this.menuService = menuService;
    this.balanceService = balanceService;
    this.mailingService = mailingService;
  }

  public newPurchase(order: Order): Promise<Purchase> {
    return new Promise<Purchase>((resolve, reject) => {
      try {
        this.balanceService.updateCustomerBalanceByCUIT(
          order.customerId, order.getFinalPrice().amount, (customerTransaction) => {
            if (customerTransaction.success) {
              this.mongoClient.insert("order", order, (error, order: Order) => {
                if (order) {
                  this.balanceService.updateProviderBalanceByEmail(
                    order.menu.ancestors[0], order.getFinalPrice().amount, (providerTransaction) => {
                      if (providerTransaction.success) {
                        this.customerService.getCustomerByCUIT(order.customerId.toString())
                          .then((response) => {
                            this.mailingService.notifyPurchase(response.data.email, order.menu.ancestors[0], order)
                              .then((response) => {
                                resolve({ success: true, order: order, balance: providerTransaction.balance });
                              })
                              .catch((mailError) => { console.log(mailError); reject({ success: false, msg: "Error while notifying by email" }) });
                          })
                          .catch((response) => { reject({ success: false, msg: "Error while retrieving the customer" }) });
                      }
                      else {
                        reject({ success: false, msg: "Error during provider transaction"})
                      }
                    }
                  );
                }
                if (error) {
                  reject({ success: false, msg: "Order Error." });
                }
              });
            }
            if (!customerTransaction.success) {
              reject({ success: false, msg: customerTransaction.msg });
            }
          });
      }
      catch (err) {
        reject({ success: false });
      }
    });
  }
}

export interface Purchase {
  success: boolean;
  order: Order;
  balance: CustomerBalance;
}

export interface PurchaseResponse {

}