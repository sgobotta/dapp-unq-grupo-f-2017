import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { MySQLClient } from "../config/mysql/client";
import { Menu, MenuBuilder } from "./../models/menu";
import TYPES from "./../constants/types";

@injectable()
export class MenuService {
  private mongoClient: MongoDBClient;
  private mySqlClient: MySQLClient;
  private collection: string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
    @inject(TYPES.MySQLClient) mySqlClient: MySQLClient
  ) {
    this.mongoClient = mongoClient;
    this.mySqlClient = mySqlClient;
    this.collection = "menu";
  }

  public getMenus(): Promise<Menu[]> {
    return new Promise<Menu[]>((resolve, reject) => {
      this.mongoClient.find(this.collection, {}, (error, data: Menu[]) => {
        resolve(data);
      });
    });
  }

  public getMenusWithName(name: string): Promise<Menu[]> {
    return new Promise<Menu[]>((resolve, reject) => {
      this.mongoClient.findWithPattern(this.collection, { property: "name", value: name }, (error, data: Menu[]) => {
        resolve(data);
      });
    });
  }

  public getMenu(id: string): Promise<Menu> {
    return new Promise<Menu>((resolve, reject) => {
      this.mongoClient.findOneById(this.collection, id, (error, data: Menu) => {
        resolve(data);
      });
    });
  }

  public getMenuByName(name: string): Promise<Menu> {
    return new Promise<Menu>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, name, (error, data: Menu) => {
        resolve(data);
      });
    });
  }

  public newMenu(menu: Menu): Promise<Menu> {
    return new Promise<Menu>((resolve, reject) => {
      let newMenu;
      try {
        newMenu = new MenuBuilder()
          .withName(menu.name)
          .withDescription(menu.description)
          .withCategory(menu.category)
          .withCurrencyName(menu.currencyName)
          .withDeliveryPrice(menu.deliveryPrice.amount)
          .withValidityRange(menu.validityRange)
          .withDeliveryTimeRange(menu.deliveryTimeRange)
          .withPrice(menu.price.amount)
          .withMinQuantity(menu.minQuantity)
          .withMinQuantityPrice(menu.minQuantityPrice.amount)
          .withMaxDailySalesQuantity(menu.maxDailySalesQuantity)
          .withAncestors(menu.ancestors)
          .build();
        this.mongoClient.insert(this.collection, newMenu, (error, data: Menu) => {
          resolve(data);
        });
      }
      catch (err) {
        console.log(err);
        return null;
      }
    });
  }

  public updateMenu(id: string, user: Menu): Promise<Menu> {
    return new Promise<Menu>((resolve, reject) => {
      this.mongoClient.update(this.collection, id, user, (error, data: Menu) => {
        resolve(data);
      });
    });
  }

  public deleteMenu(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.mongoClient.remove(this.collection, id, (error, data: any) => {
        resolve(data);
      });
    });
  }
}
