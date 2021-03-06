import { inject, injectable } from "inversify";
import { MySqlConnection } from "./connection";
import TYPES from "./../../constants/types";
import Logger from "./../../logger/logger";

@injectable()
export class Runner {


  constructor() {}

  public state: { status: String };

  public runInSession(block) {
    let connection = MySqlConnection.getConnection();

    if (connection === null) {
      connection = MySqlConnection.createConnection();
      this.state = { status: "new" };
    } else {
      this.state = { status: "open" };
    }
    Logger.info({ message: `Running in Session with state "${this.state.status}"` });
    let transaction = null;

    try {
      transaction = connection.beginTransaction((err) => {
        block();
        if (this.state.status === "new") {
          connection.commit((err) => {
            Logger.info({ message: "Performing Commit. Session will terminate." });
            MySqlConnection.destroyConnection();
            if (err) throw err;
          });
        } else {
          Logger.info({ message: "Skipping Commit. Session is still running..." });
        }
      });
    }
    catch (err) {
      connection.rollback(() => {
        Logger.error(err);
      });
    }
    finally {
      transaction = null;
      // MySql connection is closed inmediately, no need to force end it.
    }
  }
}