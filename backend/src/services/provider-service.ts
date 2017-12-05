import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { UserService } from "./user-service";
import { Provider, ProviderBuilder } from "../models/provider"
import { User } from "../models/user";
import TYPES from "./../constants/types";
import { Wove } from "aspect.js";

@Wove()
@injectable()
export class ProviderService {

  private mongoClient: MongoDBClient;
  private userService: UserService;
  private collection:string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
    @inject(TYPES.UserService) userService: UserService
  ) {
    this.mongoClient = mongoClient;
    this.userService = userService;
    this.collection = "provider";
  }

  public getProviderByEMail(email:string): Promise<ProviderResponse>{
    return new Promise<ProviderResponse>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: email}, (error, data: Provider) => {
        if (data) resolve({ success: true, data: data });
        if (error) reject({ success: false });
      });
    });
  }

  public updateProviderByEMail(email:string, provider:string): Promise<ProviderResponse>{
    return new Promise<ProviderResponse>((resolve, reject) => {
      this.mongoClient.updateByProperty(this.collection, { email: email }, provider, (error, data: Provider) => {
        if (data) resolve({ success: true, data: data });
        if (error) reject({ success: false });
      });
    });
  }

  public deleteProviderByEMail(email:string): Promise<ProviderResponse>{
    return new Promise<ProviderResponse>((resolve, reject) => {
      this.mongoClient.removeByProperty(this.collection, { email: email }, (error, data: any) => {
        if (data) resolve({ success: true, data: data});
        if (error) reject({ success: false});
      });
    });
  }

  public newProvider(request: ProviderRequest): Promise<ProviderResponse>{
    return new Promise<ProviderResponse>((resolve, reject) => {
      let newProvider;
      try {
        console.log(request.provider)
        this.userService.newUser(request.user)
          .then((response) => {
            newProvider = new ProviderBuilder()
            .withName(request.provider.name)
            .withLogo(request.provider.logo)
            .withAddress(request.provider.address.street, request.provider.address.number,
              request.provider.address.city, request.provider.address.state,
              request.provider.address.mapsLocation.latitude, request.provider.address.mapsLocation.longitude)
              .withDescription(request.provider.description)
              .withWebsite(request.provider.website)
              .withEmail(request.provider.email)
              .withPhone(request.provider.phone.area, request.provider.phone.number)
              .withAvailability(request.provider.availability.monday, request.provider.availability.tuesday,
                request.provider.availability.wednesday, request.provider.availability.thursday,
                request.provider.availability.friday, request.provider.availability.saturday,
                request.provider.availability.sunday)
              .withDeliveryLocationRange(request.provider.deliveryLocationRange.area)
              .build();
            this.mongoClient.insert(this.collection, newProvider, (error, data: Provider) => {
              if (!error) resolve({ success: true, data });
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





export interface ProviderResponse {
  success: boolean;
  data: any;
}

export interface ProviderSessionResponse {
  success: boolean;
  data: any;
  token: string;
}

export interface ProviderRequest {
  provider: Provider,
  user: User
}
