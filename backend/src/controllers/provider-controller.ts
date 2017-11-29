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
  public getProvider(request: Request) : Promise<ProviderResponse> {
    return this.providerService.getProviderByEMail(request.params.email)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPut("/:email")
  public updateProvider(request: Request): Promise<ProviderResponse> {
  	return this.providerService.updateProviderByEMail(request.params.email, request.body)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpDelete("/:email")
  public deleteProvider(request: Request): Promise<ProviderResponse> {
  	return this.providerService.deleteProviderByEMail(request.params.email)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPost("/")
  public newProvider(request: Request): Promise<ProviderResponse> {
  	return this.providerService.newProvider(request.body)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

}
