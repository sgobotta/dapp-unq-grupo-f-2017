import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Order } from "./../models/order";
import { PurchaseService, PurchaseResponse  } from "./../services/purchase-service";
import { Request, Response } from "express";
import TYPES from "./../constants/types";

@injectable()
@controller("/purchase")
export class PurchaseController {

  constructor(@inject(TYPES.PurchaseService) private purchaseService: PurchaseService) { }

  @httpPost("/")
  public newPurchase(request: Request): Promise<PurchaseResponse> {
    return this.purchaseService.newPurchase(request.body.order)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }
}
