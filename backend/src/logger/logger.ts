import * as winston from "winston";

export default class Logger {

  public static logger: winston.LoggerInstance;

  public static createLogger() {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'morfi-ya.log' })
      ]
    });
  }

  public static getLogger() {
    return this.logger;
  }

  public static info(message) {
    this.logger.info(message);
  }


}


