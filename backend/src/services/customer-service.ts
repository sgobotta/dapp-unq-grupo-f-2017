import { inject, injectable } from "inversify";
import TYPES from "./../constants/types";
import { Customer } from "../models/customer"

@injectable()
export class CustomerService {

  public getCustomerByCUIT(cuit:string): Promise<Customer>{
    return new Promise<Customer>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

  public updateCusomerByCUIT(cuit:string, json:string): Promise<Customer>{
    return new Promise<Customer>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

  public deleteCustomerByCUIT(cuit:string): Promise<Customer>{
    return new Promise<Customer>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

  public newCustomer(json: string): Promise<Customer>{
    return new Promise<Customer>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

}
