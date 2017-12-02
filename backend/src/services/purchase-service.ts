import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { MenuService } from "./menu-service";
import { BalanceService } from "./balance-service";
import { OrderService } from "./order-service";
import { Order, OrderBuilder } from "./../models/order";
import { Menu, MenuBuilder } from "./../models/menu";
import { CustomerBalance } from "./../models/balance/customer-balance";
import { ProviderBalance } from "./../models/balance/provider-balance";
import TYPES from "./../constants/types";
import { Wove } from "aspect.js";

@Wove()
@injectable()
export class PurchaseService {
  private mongoClient: MongoDBClient;
  private menuService: MenuService;
  private balanceService: BalanceService;
  private collection: string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
    @inject(TYPES.MenuService) menuService: MenuService,
    @inject(TYPES.BalanceService) balanceService: BalanceService
  ) {
    this.mongoClient = mongoClient;
    this.menuService = menuService;
    this.balanceService = balanceService;
  }

  public newPurchase(order: Order): Promise<Purchase> {
    return new Promise<Purchase>((resolve, reject) => {
      try {
        this.balanceService.updateCustomerBalanceByCUIT(
          order.customerId, order.getFinalPrice(), (res) => {
            if (res.success) {
              this.mongoClient.insert("order", order, (error, order: Order) => {
                if (order) {
                  this.balanceService.updateProviderBalanceByEmail(
                    order.menu.ancestors[0], order.getFinalPrice(), (err, res) => {
                      if (err) {
                      }
                      if (res) {
                        // mandar mail
                      }
                    }
                  );
                  resolve({ success: true, order: order, balance: res.balance });
                }
                if (error) {
                  reject({ success: false, msg: "Order Error." });
                }
              });
            }
            if (!res.success) {
              reject({ success: false, msg: res.msg });
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