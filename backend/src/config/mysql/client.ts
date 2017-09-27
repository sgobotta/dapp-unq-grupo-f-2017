import { injectable } from "inversify";
import * as mysql from "mysql";

@injectable()
export class MySQLClient {

  public connection: mysql.IConnection;

  constructor() {
    let config = {
      host     : "localhost:3006" || process.env.JAWSDB_URL,
      user     : "root",
      password : "root",
      database : "morfiya"
    };

    this.connection = mysql.createConnection(config);
    console.log(this.connection);
  }

  public createConnection(){
    return this.connection;
  }

  public connect(): void {
    this.connection.connect(function(res, err){
      if(err){
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }

  public disconnect(): void {
    this.connection.end(function(err){
      if(err){
        throw err;
      }
    });
  }



}
