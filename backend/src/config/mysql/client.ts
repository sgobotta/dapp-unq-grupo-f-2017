import { injectable } from "inversify";
import * as mysql2 from "mysql";
import * as mysql from "mysql2";
import * as Sequelize from "sequelize";

@injectable()
export class MySQLClient {

  private connection: mysql.IConnection;
  private pool: mysql.IPool;
  private sequelize;

  constructor() {
    this.connection  = mysql.createConnection({
      host            : "localhost" || process.env.JAWSDB_URL,
      user            : "root",
      password        : "root",
      database        : "morfiya"
    });

    this.sequelize = new Sequelize("morfiya", "root", "root", {
      host: "localhost",
      dialect: "mysql",
      pool: { max: 5, min: 0, idle: 10000 }
    });
  }

  public createConnection() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });

    return this.connection;
  }

  public connect(): void {
    this.connection.connect(function(res, err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }

  public disconnect(): void {
    this.connection.end(function(err) {
      if(err) {
        throw err;
      }
    });
  }

}
