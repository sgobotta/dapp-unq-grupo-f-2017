import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { Provider } from "../models/provider"
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

  public newProvider(provider: string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      this.mongoClient.insert(this.collection, provider, (error, data: Provider) => {
        resolve(data);
      });
    });
  }

}
