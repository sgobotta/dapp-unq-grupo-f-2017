import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { Provider, ProviderBuilder } from "../models/provider"
import TYPES from "./../constants/types";
import { Wove } from "aspect.js";

@Wove()
@injectable()
export class ProviderService {

  private mongoClient: MongoDBClient;
  private collection:string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient
  ) {
    this.mongoClient = mongoClient;
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

  public newProvider(provider: Provider): Promise<ProviderResponse>{
    return new Promise<ProviderResponse>((resolve, reject) => {
      let newProvider;
      try {
        newProvider = new ProviderBuilder()
        .withName(provider.name)
        .withLogo(provider.logo)
        .withAddress(provider.address.street, provider.address.number,
          provider.address.city, provider.address.state,
          provider.address.mapsLocation.latitude, provider.address.mapsLocation.longitude)
          .withDescription(provider.description)
          .withWebsite(provider.website)
          .withEmail(provider.email)
          .withPhone(provider.phone.area, provider.phone.number)
          .withAvailability(provider.availability.monday, provider.availability.tuesday,
            provider.availability.wednesday, provider.availability.thursday,
            provider.availability.friday, provider.availability.saturday,
            provider.availability.sunday)
          .withDeliveryLocationRange(provider.deliveryLocationRange.area)
          .build();

          this.mongoClient.insert(this.collection, provider, (error, data: Provider) => {
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

export interface ProviderResponse {
  success: boolean;
  data: any;
}
