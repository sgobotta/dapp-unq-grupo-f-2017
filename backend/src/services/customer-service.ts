import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import TYPES from "./../constants/types";
import { Customer, CustomerBuilder } from "../models/customer";
import { User, UserBuilder } from "../models/user";
import Address from "../models/utils/address";
import { UserService } from "./user-service";
import { Wove } from "aspect.js";

@Wove()
@injectable()
export class CustomerService {

  private mongoClient: MongoDBClient;
  private userService: UserService;
  private collection: string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
    @inject(TYPES.UserService) userService: UserService
  ) {
    this.mongoClient = mongoClient;
    this.userService = userService;
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

  public getCustomerByEmail(email:string): Promise<CustomerResponse> {
    return new Promise<CustomerResponse>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: email}, (error, data: Customer) => {
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

  public newCustomer(request: CustomerRequest): Promise<CustomerSessionResponse> {
    return new Promise<CustomerSessionResponse>((resolve, reject) => {
      let newCustomer;
      try {
        this.userService.newUser(request.user)
          .then((response) => {
            newCustomer = new CustomerBuilder()
            .withCUIT(request.customer.cuit)
            .withName(request.customer.name)
            .withSurname(request.customer.surname)
            .withEmail(request.customer.email)
            .withPhone(request.customer.phone.area, request.customer.phone.number)
            .withAddress(request.customer.address.street, request.customer.address.number,
              request.customer.address.city, request.customer.address.state,
              request.customer.address.mapsLocation.latitude, request.customer.address.mapsLocation.longitude)
              .build();
            this.mongoClient.insert(this.collection, newCustomer, (error, data: Customer) => {
              if (!error) resolve({ success: true, data, token: response.data.session.token });
              if (error) throw error;
            });
          })
          .catch((error) => {
            reject(error)
          })
      }
      catch (err) {
        reject({ success: false, msg: "Error while creating new user" });
      }
    });
  }
}

export interface CustomerResponse {
  success: boolean;
  data: any;
}

export interface CustomerSessionResponse {
  success: boolean;
  data: any;
  token: string
}

export interface CustomerRequest {
  customer: Customer,
  user: User
}
