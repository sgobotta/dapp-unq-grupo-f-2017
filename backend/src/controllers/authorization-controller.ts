import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { AuthorizationService, LoginResponse } from "../services/authorization-service";
import { Request, Response } from "express";
import TYPES from "../constants/types";


@injectable()
@controller("/authorization")
export class AuthorizationController {

  constructor(@inject(TYPES.AuthorizationService) private authorizationService: AuthorizationService) {}

  @httpPost("/:email")
  public login(request: Request): Promise<LoginResponse> {
    return this.authorizationService.login(request.params.email, request.body.password)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }
}
