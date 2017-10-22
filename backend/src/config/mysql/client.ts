import { injectable } from "inversify";
import * as mysql from "mysql";
import * as path from "path";
import Menu from "./../../models/menu";
import { connectionConfig } from "./config";

@injectable()
export class MySQLClient {

  private connection: mysql.IConnection;
  private pool: mysql.IPool;

  constructor() {
    if (!process.env.ON_DEPLOY) {
      this.connection = mysql.createConnection(connectionConfig.local);
    }
    if (process.env.ON_DEPLOY) {
      this.connection = mysql.createConnection(connectionConfig.deploy);
    }
  }

  public getConnection() {
    return this.connection;
  }

  public connect(): void {
    this.connection.connect((res, err) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }

  public disconnect(): void {
    this.connection.end((err) => {
      if(err) {
        throw err;
      }
    });
  }

}
