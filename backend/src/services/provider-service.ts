import { inject, injectable } from "inversify";
import TYPES from "./../constants/types";
import { Provider } from "../models/provider"

@injectable()
export class ProviderService {

  public getProviderByEMail(email:string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

  public updateProviderByEMail(email:string, json:string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

  public deleteProviderByEMail(email:string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

  public newProvider(json: string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

}
