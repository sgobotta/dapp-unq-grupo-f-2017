import * as mysql from "mysql";
import { connectionConfig } from "./config";

export class MySqlConnection {

  public static session:mysql.IConnection;;

  private static createConnection() {
    if (!process.env.ON_DEPLOY) {
      return mysql.createConnection(connectionConfig.local);
    }
    if (process.env.ON_DEPLOY) {
      return mysql.createConnection(connectionConfig.deploy);

    }
  }

  public static getSession() {
    if(!this.session) {
      this.session = this.createConnection();
    }
    return this.session;
  }

}