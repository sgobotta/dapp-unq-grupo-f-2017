import { beforeMethod, afterMethod, Wove, Metadata } from "aspect.js";
import Logger from "./../logger/logger";

export class BuilderAspect {
  @beforeMethod({
    classNamePattern: /^(ProviderBuilder)/,
    methodNamePattern: /^(with)/
  })
  invokeBeforeMethod(meta: Metadata) {
    const args = meta.method.args;
    if (args[0] === undefined) {
      Logger.error({ message: `Error while creating ${meta.className} model with args: ${args[0]}` });
      throw new Error("Property can't be null");
    }
  }
}