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

  @httpGet("/:mail")
  public getProviderBalance(request: Request, response: Response) {
    return this.balanceService.getProviderBalanceByEmail(request.params.mail, response);
  }

  @httpGet("/customer/:mail")
  public getCustomerBalanceByEmail(request: Request, response: Response) {
    return this.balanceService.getCustomerBalanceByEmail(request.params.mail, response);
  }

}
