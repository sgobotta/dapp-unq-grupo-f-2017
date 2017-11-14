import { beforeMethod, afterMethod, Wove, Metadata } from "aspect.js";
import Logger from "./logger";

export class LoggerAspect {
  @beforeMethod({
    classNamePattern: /^(MongoDBClient|MySQLClient)/,
    methodNamePattern: /^(find|insert|remove|update)/
  })
  invokeBeforeMethod(meta: Metadata) {
    const args = JSON.stringify(meta.method.args);
    Logger.info({ message: `Called ${meta.className}`, method: `${meta.method.name}`, args: `${args}` });
  }
}