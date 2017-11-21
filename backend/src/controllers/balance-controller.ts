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
    return this.balanceService.getProviderBalanceByEmail(request.params.mail, (result) => {
      response.send(result);
    });
  }

  @httpPut("/provider/:mail/:amount")
  public updateProviderBalance(request: Request, response: Response) {
    return this.balanceService.updateProviderBalanceByEmail(request.params.mail, request.params.amount, (result) => {
      response.send(result);
    });
  }

  @httpGet("/customer/:cuit")
  public getCustomerBalance(request: Request, response: Response) {
    return this.balanceService.getCustomerBalanceByCUIT(request.params.cuit, (result) => {
      response.send(result);
    });
  }

  @httpPut("/customer/:cuit/:amount")
  public updateCustomerBalance(request: Request, response: Response) {
    return this.balanceService.updateCustomerBalanceByCUIT(request.params.cuit, request.params.amount, (result) => {
      response.send(result);
    });
  }

  @httpPost("/provider")
  public newProviderBalance(request: Request, response: Response) {
    return this.balanceService.newProviderBalance(request.body.providerId, (result) => {
      response.send(result);
    });
  }

  @httpPost("/customer")
  public newCustomerBalance(request: Request, response: Response) {
    return this.balanceService.newCustomerBalance(request.body.customerId, (result) => {
      response.send(result);
    });
  }

}
