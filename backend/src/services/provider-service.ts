import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { Provider, ProviderBuilder } from "../models/provider"
import TYPES from "./../constants/types";

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

  public getProviderByEMail(email:string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: email}, (error, data: Provider) => {
        resolve(data);
      });
    });
  }

  public updateProviderByEMail(email:string, provider:string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      this.mongoClient.updateByProperty(this.collection, { email: email }, provider, (error, data: Provider) => {
        resolve(data);
      });
    });
  }

  public deleteProviderByEMail(email:string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      this.mongoClient.removeByProperty(this.collection, { email: email }, (error, data: any) => {
        resolve(data);
      });
    });
  }

  public newProvider(provider: Provider): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
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
            resolve(data);
          });
      }
      catch (err) {
        return null;
      }
    });
  }
}
