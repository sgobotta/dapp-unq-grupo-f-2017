import { inject, injectable } from "inversify";
import { MySqlConnection } from "./connection";
import TYPES from "./../../constants/types";

@injectable()
export class Runner {

  public static runInSession(block) {

    let connection = MySqlConnection.getConnection();
    if (!connection) {
        connection = MySqlConnection.createConnection();
    }
    let transaction = null;

    try {
      transaction = connection.beginTransaction((err) => {
        let transactionResult = block();
        connection.commit((err) => {
          if (err) throw err; // Log message
        });
      });
    }
    catch (err) {
      connection.rollback(() => {
        console.log(err.message); // Log message
      });
    }
    finally {
      transaction = null;
      // MySql connection is closed inmediately, no need to force end it.
    }
  }
}