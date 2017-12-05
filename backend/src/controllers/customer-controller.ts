import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { CustomerService, CustomerResponse, CustomerSessionResponse } from "../services/customer-service"
import { Request, Response } from "express";
import TYPES from "../constants/types";
import { Customer } from "../models/customer"


@injectable()
@controller("/customer")
export class CustomerController {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {

  }

  @httpGet("/:cuit")
  public getCustomer(request: Request) : Promise<CustomerResponse> {
    return this.customerService.getCustomerByCUIT(request.params.cuit)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPut("/:cuit")
  public updateCustomer(request: Request): Promise<CustomerResponse> {
  	return this.customerService.updateCustomerByCUIT(request.params.cuit, request.body)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpDelete("/:cuit")
  public deleteCustomer(request: Request): Promise<CustomerResponse> {
  	return this.customerService.deleteCustomerByCUIT(request.params.cuit)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPost("/")
  public newCustomer(request: Request): Promise<CustomerSessionResponse> {
  	return this.customerService.newCustomer(request.body)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }
}

