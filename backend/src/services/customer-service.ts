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

  public getCustomerByCUIT(cuit:string): Promise<Customer>{
    return new Promise<Customer>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { cuit: cuit}, (error, data: Customer) => {
        resolve(data);
      });
    });
  }

  public updateCustomerByCUIT(cuit:string, customer:string): Promise<Customer>{
    return new Promise<Customer>((resolve, reject) => {
      this.mongoClient.updateByProperty(this.collection, { cuit: cuit }, customer, (error, data: Customer) => {
        resolve(data);
      });
    });
  }

  public deleteCustomerByCUIT(cuit:string): Promise<Customer>{
    return new Promise<Customer>((resolve, reject) => {
      this.mongoClient.removeByProperty(this.collection, { cuit: cuit }, (error, data: any) => {
        resolve(data);
      });
    });
  }

  public newCustomer(customer: Customer): Promise<Customer>{
    return new Promise<Customer>((resolve, reject) => {

      let newCustomer = new CustomerBuilder()
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
        resolve(data);
      });
    });


  }

}
