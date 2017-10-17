import { inject, injectable } from "inversify";
import TYPES from "./../constants/types";
import { Provider } from "../models/provider"

@injectable()
export class ProviderService {

  public getProviderByCUIT(cuit:string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

  public updateProviderByCUIT(cuit:string, json:string): Promise<Provider>{
    return new Promise<Provider>((resolve, reject) => {
      // To Do
      resolve(null)
    })
  }

  public deleteProviderByCUIT(cuit:string): Promise<Provider>{
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
