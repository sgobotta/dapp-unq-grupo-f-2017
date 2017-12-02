import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { MenuService } from "./menu-service";
import { BalanceService } from "./balance-service";
import { Order, OrderBuilder } from "./../models/order";
import { Menu, MenuBuilder } from "./../models/menu";
import { CustomerBalance } from "./../models/balance/customer-balance";
import TYPES from "./../constants/types";
import { Wove } from "aspect.js";

@Wove()
@injectable()
export class OrderService {
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
    this.collection = "order";
  }

  public getOrders(cuit: number): Promise<OrderListResponse> {
    return new Promise<OrderListResponse>((resolve, reject) => {
      this.mongoClient.find(this.collection, { customerId: cuit }, (error, orders: Order[]) => {
        if (orders) resolve({ success: true, orders: orders });
        if (error) reject({ success: false });
      });
    });
  }

  public newOrder(order: Order): Promise<OrderResponse> {
    return new Promise<OrderResponse>((resolve, reject) => {
      let newOrder;
      let newMenu;
      try {
        this.menuService.getMenuByOwner(order.menu.name, order.menu.ancestors)
          .then((response) => {
            console.log("THE MENU RESPONSE")
            console.log(response);
            newMenu = response;

            newOrder = new OrderBuilder()
              .withCustomerId(order.customerId)
              .withDeliveryType(order.deliveryType)
              .withMenu(newMenu)
              .withQuantity(order.quantity)
              .withDeliveryTime(order.deliveryTime)
              .build();
            const finalPrice = newOrder.getFinalPrice();

            this.balanceService.updateCustomerBalanceByCUIT(
              newOrder.customerId, finalPrice, (err, res) => {
                if (res.success) {
                  this.mongoClient.insert(this.collection, newOrder, (error, order: Order) => {
                    if (order) {
                      resolve({ success: true, order: order, balance: res.balance });
                    }
                    if (error) throw err;
                  });
                }
                if (err) throw err;
              })
          })
          .catch((response) => {
            throw new Error(response);
          })
      }
      catch (err) {
        console.log(err)
        reject({ success: false });
      }
    });
  }
}

export interface OrderResponse {
  success: boolean;
  order: Order;
  balance: CustomerBalance;
}

export interface OrderListResponse {
  success: boolean;
  orders: Order[];
}
