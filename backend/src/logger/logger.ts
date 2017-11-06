import * as winston from "winston";

export default class Logger {

  public static logger: winston.LoggerInstance;

  public static createLogger() {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({ colorize: true, align: true, handleExceptions: true }),
        new winston.transports.File({ filename: "morfi-ya.log", json: true, colorize: true, handleExceptions: true })
      ]
    });
  }

  public static info(...params) {
    this.logger.info(params.join());
  }


}


