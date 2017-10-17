import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { CustomerService } from "../services/customer-service"
import { Request, Response } from "express";
import TYPES from "../constants/types";
import { Customer } from "../models/customer"


@injectable()
@controller("/customer")
export class CustomerController {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {

  }

  @httpGet("/:cuit")
  public getCustomer(request: Request) : Promise<Customer> {
    return this.customerService.getCustomerByCUIT(request.params.cuit)
  }

  @httpPut("/:cuit")
  public updateCustomer(request: Request): Promise<Customer> {
  	return this.customerService.updateCusomerByCUIT(request.params.cuit, request.body)
  }

  @httpDelete("/:cuit")
  public deleteCustomer(request: Request): Promise<Customer> {
  	return this.customerService.deleteCustomerByCUIT(request.params.cuit)
  }

  @httpPost("/")
  public newCustomer(request: Request): Promise<Customer> {
  	return this.customerService.newCustomer(request.body)
  }


}
