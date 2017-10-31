import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { BalanceService } from "../services/balance-service";
import { Request, Response } from "express";
import TYPES from "../constants/types";


@injectable()
@controller("/balance")
export class BalanceController {

  constructor(@inject(TYPES.BalanceService) private balanceService: BalanceService) { }

  @httpGet("/provider/:mail")
  public getProviderBalance(request: Request, response: Response) {
    return this.balanceService.getProviderBalanceByEmail(request.params.mail, response);
  }

  @httpPut("/provider/:mail/:amount")
  public updateProviderBalance(request: Request, response: Response) {
    return this.balanceService.updateProviderBalanceByEmail(request.params.mail, request.params.amount, response);
  }

  @httpGet("/customer/:cuit")
  public getCustomerBalance(request: Request, response: Response) {
    return this.balanceService.getCustomerBalanceByCUIT(request.params.cuit, response);
  }

  @httpPut("/customer/:cuit/:amount")
  public updateCustomerBalance(request: Request, response: Response) {
    return this.balanceService.updateCustomerBalanceByCUIT(request.params.cuit, request.params.amount, response);
  }

  @httpPost("/")
  public newBalance(request: Request, response: Response) {
    return this.balanceService.newBalance(request.body, response);
  }

}
