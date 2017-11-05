import { injectable } from "inversify";
import * as mysql from "mysql";
import * as path from "path";
import Menu from "./../../models/menu";
import { connectionConfig } from "./config";
import { MySqlConnection } from "./connection";

@injectable()
export class MySQLClient {

  private connection: mysql.IConnection;
  private pool: mysql.IPool;

  constructor() {
    this.connection = MySqlConnection.getSession();
  }

  public getConnection() {
    return this.connection;
  }

  public findOneByProperty(collection, object, callback) {
    let prop = Object.keys(object)[0];
    this.connection.query(`SELECT * FROM ${collection} WHERE ${prop}=?`, object[prop], (err, res) => {
      callback(err, res);
    });
  }

  public updateOneByProperty(collection, object, callback) {
    let id = Object.keys(object)[0];
    let propToUpdate = Object.keys(object)[1];
    this.connection.query(`UPDATE ${collection} SET ${propToUpdate}=? WHERE ${id}=?`, [object[propToUpdate], object[id]], (err, res) => {
      callback(err, res);
    });
  }

  public insertOne(collection, object, callback) {
    this.connection.query(`INSERT INTO ${collection} SET ?`, object, (err, res) => {
      callback(err, res);
    });
  }

}
