import { inject, injectable } from "inversify";
import { MongoDBClient } from "../config/mongodb/client";
import { MySQLClient } from "../config/mysql/client";
import Menu from "./../models/menu";
import TYPES from "./../constants/types";

@injectable()
export class MenuService {
  private mongoClient: MongoDBClient;
  private mySqlClient: MySQLClient;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
    @inject(TYPES.MySQLClient) mySqlClient: MySQLClient
  ) {
    this.mongoClient = mongoClient;
    this.mySqlClient = mySqlClient;
  }

  public getMenus(): Promise<Menu[]> {
    return new Promise<Menu[]>((resolve, reject) => {
      this.mongoClient.find("menu", {}, (error, data: Menu[]) => {
        resolve(data);
      });
    });
  }

  public getMenu(id: string): Promise<Menu> {
    return new Promise<Menu>((resolve, reject) => {
      this.mongoClient.findOneById("menu", id, (error, data: Menu) => {
        resolve(data);
      });
    });
  }


  public newMenu(menu: Menu) {
    return new Promise<Menu>((resolve, reject) => {
      // this.mongoClient.insert("menu", menu, (error, data: Menu) => {
      //   resolve(data);
      // });

      let connection = this.mySqlClient.connect();

      // let menu = Menu.build<Menu>({
      //   name: "pepito",
      //   description: "crocante"
      // });
      // menu.save();
      // console.log(menu);

    });
  }

  public updateMenu(id: string, user: Menu): Promise<Menu> {
    return new Promise<Menu>((resolve, reject) => {
      this.mongoClient.update("menu", id, user, (error, data: Menu) => {
        resolve(data);
      });
    });
  }

  public deleteMenu(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.mongoClient.remove("menu", id, (error, data: any) => {
        resolve(data);
      });
    });
  }
}
