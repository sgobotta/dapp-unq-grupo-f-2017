import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Order } from "./../models/order";
import { OrderService, OrderResponse, OrderListResponse } from "./../services/order-service";
import { Request, Response } from "express";
import TYPES from "./../constants/types";

@injectable()
@controller("/order")
export class OrderController {

  constructor(@inject(TYPES.OrderService) private orderService: OrderService) { }

  @httpGet("/:cuit")
  public getOrders(request: Request): Promise<OrderListResponse> {
    return this.orderService.getOrders(request.params.cuit)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPost("/")
  public newMenu(request: Request): Promise<OrderListResponse> {
    return this.orderService.newOrder(request.body.order)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }
}
