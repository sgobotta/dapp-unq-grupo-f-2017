import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { ProviderService, ProviderResponse } from "../services/provider-service"
import { Request, Response } from "express";
import TYPES from "../constants/types";
import { Provider } from "../models/provider"

@injectable()
@controller("/provider")
export class ProviderController {

  constructor(@inject(TYPES.ProviderService) private providerService: ProviderService) {

  }

  @httpGet("/:email")
  public getProvider(request: Request) : Promise<Provider> {
    return this.providerService.getProviderByEMail(request.params.email)
  }

  @httpPut("/:email")
  public updateProvider(request: Request): Promise<Provider> {
  	return this.providerService.updateProviderByEMail(request.params.email, request.body)
  }

  @httpDelete("/:email")
  public deleteProvider(request: Request): Promise<Provider> {
  	return this.providerService.deleteProviderByEMail(request.params.email)
  }

  @httpPost("/")
  public newProvider(request: Request): Promise<ProviderResponse> {
  	return this.providerService.newProvider(request.body)
      .then((response) => { return response; })
      .catch((response) => { console.log(response); return response; });
  }

}
