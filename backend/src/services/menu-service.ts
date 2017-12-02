import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { MySQLClient } from "../config/mysql/client";
import { Menu, MenuBuilder } from "./../models/menu";
import TYPES from "./../constants/types";
import { Wove } from "aspect.js";

@Wove()
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

  public getMenus(): Promise<MenuListResponse> {
    return new Promise<MenuListResponse>((resolve, reject) => {
      this.mongoClient.find(this.collection, {}, (error, data: Menu[]) => {
        if (data) resolve({ success: true, data: data });
        if (error) reject({ success: false });
      });
    });
  }

  public getMenusWithName(name: string): Promise<MenuListResponse> {
    return new Promise<MenuListResponse>((resolve, reject) => {
      this.mongoClient.findWithPattern(this.collection, { property: "name", value: name }, (error, data: Menu[]) => {
        if (data) resolve({ success: true, data: data });
        if (error) reject({ success: false });
      });
    });
  }

  public getMenusWithCategory(categories: string[]): Promise<MenuListResponse> {
    return new Promise<MenuListResponse>((resolve, reject) => {
      this.mongoClient.findIncluding(this.collection, "category", categories, (error, data) => {
        if (data) resolve({ success: true, data: data });
        if (error) reject({ success: false });
      });;
    })
  }

  public getMenu(id: string): Promise<MenuResponse> {
    return new Promise<MenuResponse>((resolve, reject) => {
      this.mongoClient.findOneById(this.collection, id, (error, data: Menu) => {
        if (data) resolve({ success: true, data: data});
        if (error) reject({ success: false });
      });
    });
  }

  public getMenuByName(name: string): Promise<MenuResponse> {
    return new Promise<MenuResponse>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { name: name }, (error, data: Menu) => {
        if (data) resolve({ success: true, data: data});
        if (error) reject({ success: false });
      });
    });
  }

  public getMenuByOwner(name: string, ancestors: string[]): Promise<MenuResponse> {
    return new Promise<MenuResponse>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { name: name, ancestors: ancestors }, (error, menu: Menu) => {
        if (menu)  {
          const newMenu = new MenuBuilder()
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
          resolve({ success: true, data: menu });
        }
        if (error) reject({ success: false });
      })
    })
  }

  public newMenu(menu: Menu): Promise<MenuResponse> {
    return new Promise<MenuResponse>((resolve, reject) => {
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
          if (!error) resolve({ success: true, data: data });
        });
      }
      catch (err) {
        console.log(err)
        reject({ success: false });
      }
    });
  }

  public updateMenu(id: string, user: Menu): Promise<MenuResponse> {
    return new Promise<MenuResponse>((resolve, reject) => {
      this.mongoClient.update(this.collection, id, user, (error, data: Menu) => {
        if (data) resolve({ success: true, data: data});
        if (error) reject({ success: false });
      });
    });
  }

  public deleteMenu(id: string): Promise<MenuResponse> {
    return new Promise<MenuResponse>((resolve, reject) => {
      this.mongoClient.remove(this.collection, id, (error, data: any) => {
        if (data) resolve({ success: true, data: "Selected Menu has been deleted."});
        if (error) reject({ success: false });
      });
    });
  }
}

export interface MenuResponse {
  success: boolean;
  data: any;
}

export interface MenuListResponse {
  success: boolean;
  data: Menu[];
}
