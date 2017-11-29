import { inject, injectable } from "inversify";
import { Collection } from "mongodb";
import { MySQLClient } from "./mysql/client";
import { MySqlConnection } from "./mysql/connection";
import { MongoDBConnection } from "./mongodb/connection";
import TYPES from "./../constants/types";
import * as path from "path";
import * as fs from "fs";
import Logger from "../logger/logger";

@injectable()
export default class Startup {

  private mySqlClient: MySQLClient;

  constructor(
    @inject(TYPES.MySQLClient) mySqlClient: MySQLClient
  ) {
    this.mySqlClient = mySqlClient;
  }

  public loadDatabases() {
    this.loadMongoCollections();
    this.loadSqlTables();
  }

  private getConnection(callback) {
    MongoDBConnection.getConnection((connection) => {
      if (!connection) console.log("No databases found");
      callback(connection);
    });
  }

  private dropCollection(collection: Collection) {
    collection.drop((err, res) => {
      if (err) throw err;
    });
  }

  private importCollection(collection: Collection, data) {
    this.dropCollection(collection);
    collection.insert(data, (err, insert) => {
      if (err) throw err;
      if (insert) {
        Logger.info({ message: `MongoDB ::: Collection ${collection.collectionName} loaded succesfully.` });
      }
    });
  }

  private loadMongoCollections() {

    // TODO: implement get assets function from private data
    let menusInfo = JSON.parse(fs.readFileSync(path.join(__dirname + "./../../private/data/", "menu.json"), "utf8"));
    let customersInfo = JSON.parse(fs.readFileSync(path.join(__dirname + "./../../private/data/", "customers.json"), "utf8"));
    let providersInfo = JSON.parse(fs.readFileSync(path.join(__dirname + "./../../private/data/", "providers.json"), "utf8"));

    this.getConnection((connection) => {
      connection.createCollection("menu", { w: 1 }, (err, collection) => {
        if (err) return;
        else {
          this.importCollection(collection, menusInfo);
        }
      });
      connection.createCollection("customer", { w: 1 }, (err, collection) => {
        if (err) return;
        else {
          this.importCollection(collection, customersInfo);
        }
      });
      connection.createCollection("provider", { w: 1 }, (err, collection) => {
        if (err) return;
        else {
          this.importCollection(collection, providersInfo);
        }
      });
    });
  }

  private loadSqlTables() {
    // TODO: implement get assets function
    const tablesInfo = fs.readFileSync(path.join(__dirname + "./../../private/data/initial_data.sql"), "utf8").toString();
    const connection = MySqlConnection.createConnection();
    connection.query(tablesInfo, (err, res) => {
        if (err) throw err;
        if (res) {
          Logger.info({ message: "MySql ::: Database loaded succesfully" });
          MySqlConnection.destroyConnection();
        }
    });
  }
}
