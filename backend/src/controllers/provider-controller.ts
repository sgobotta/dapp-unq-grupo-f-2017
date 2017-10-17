import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { ProviderService } from "../services/provider-service"
import { Request, Response } from "express";
import TYPES from "../constants/types";
import { Provider } from "../models/provider"


@injectable()
@controller("/provider")
export class ProviderController {

  constructor(@inject(TYPES.CustomerService) private providerService: ProviderService) {

  }

  @httpGet("/:cuit")
  public getProvider(request: Request) : Promise<Provider> {
    return this.providerService.getProviderByCUIT(request.params.cuit)
  }

  @httpPut("/:cuit")
  public updateProvider(request: Request): Promise<Provider> {
  	return this.providerService.updateProviderByCUIT(request.params.cuit, request.body)
  }

  @httpDelete("/:cuit")
  public deleteProvider(request: Request): Promise<Provider> {
  	return this.providerService.deleteProviderByCUIT(request.params.cuit)
  }

  @httpPost("/")
  public newProvider(request: Request): Promise<Provider> {
  	return this.providerService.newProvider(request.body)
  }

}
