import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import TYPES from "./../constants/types";
import { Customer, CustomerBuilder } from "../models/customer";
import Address from "../models/utils/address";

@injectable()
export class CustomerService {

  private mongoClient: MongoDBClient;
  private collection: string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient
  ) {
    this.mongoClient = mongoClient;
    this.collection = "customer";
  }

  public getCustomerByCUIT(cuit:string): Promise<CustomerResponse> {
    return new Promise<CustomerResponse>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { cuit: cuit}, (error, data: Customer) => {
        if (data) resolve({ success: true, data: data });
        if (error) reject({ success: false });
      });
    });
  }

  public updateCustomerByCUIT(cuit:string, customer: Customer): Promise<CustomerResponse> {
    return new Promise<CustomerResponse>((resolve, reject) => {
      this.mongoClient.updateByProperty(this.collection, { cuit: cuit }, customer, (error, data: Customer) => {
        if (data) resolve({ success: true, data: data });
        if (error) reject({ success: false });
      });
    });
  }

  public deleteCustomerByCUIT(cuit:string): Promise<CustomerResponse> {
    return new Promise<CustomerResponse>((resolve, reject) => {
      this.mongoClient.removeByProperty(this.collection, { cuit: cuit }, (error, data: any) => {
        if (data) resolve({ success: true, data: data });
        if (error) reject({ success: false });
      });
    });
  }

  public newCustomer(customer: Customer): Promise<CustomerResponse> {
    return new Promise<CustomerResponse>((resolve, reject) => {
      let newCustomer;
      try {
        newCustomer = new CustomerBuilder()
        .withCUIT(customer.cuit)
        .withName(customer.name)
        .withSurname(customer.surname)
        .withEmail(customer.email)
        .withPhone(customer.phone.area, customer.phone.number)
        .withAddress(customer.address.street, customer.address.number,
          customer.address.city, customer.address.state,
          customer.address.mapsLocation.latitude, customer.address.mapsLocation.longitude)
          .build();

          this.mongoClient.insert(this.collection, customer, (error, data: Customer) => {
            if (!error) resolve({ success: true, data });
            if (error) throw error;
          });
      }
      catch (err) {
        reject({ success: false });
      }
    });
  }
}

export interface CustomerResponse {
  success: boolean;
  data: any;
}