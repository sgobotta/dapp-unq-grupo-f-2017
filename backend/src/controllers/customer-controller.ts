import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { CustomerService } from "../services/customer-service"
import { Request, Response } from "express";
import TYPES from "./../constants/types";

@injectable()
@controller("/customer")
export class CustomerController {

  constructor(@inject(TYPES.CustomerService) private customerService: CustomerService) {

  }


}
