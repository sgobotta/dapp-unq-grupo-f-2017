import { inject, injectable } from "inversify";
import { MySqlConnection } from "./connection";
import TYPES from "./../../constants/types";

@injectable()
export class Runner {

  public static state: { status: String };

  public static runInSession(block) {
    let connection = MySqlConnection.getConnection();
    this.state = { status: "open" };
    if (!connection) {
      connection = MySqlConnection.createConnection();
      this.state = { status: "new" };
    }
    let transaction = null;

    try {
      transaction = connection.beginTransaction((err) => {
        block();
        if (this.state.status === "open") {
          connection.commit((err) => {
            if (err) throw err; // Log message
          });
        }
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