import { injectable } from "inversify";
import * as mysql from "mysql";
import * as path from "path";
import Menu from "./../../models/menu";

@injectable()
export class MySQLClient {

  private connection: mysql.IConnection;
  private pool: mysql.IPool;

  constructor() {
    this.connection  = mysql.createConnection({
      host            : "localhost" || process.env.JAWSDB_URL,
      user            : "root",
      password        : "root",
      database        : "morfiya"
    });

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
