import { aroundStaticMethod, aroundMethod, beforeMethod, Wove, Metadata } from "aspect.js";
import Logger from "../../logger/logger";
import { Runner } from "./runner";

export class RunnerAspect {
  @beforeMethod({
    classNamePattern: /^BalanceService/,
    methodNamePattern: /^(getProviderBalanceByEmail|getCustomerBalanceByCUIT|newProviderBalance|depositToProviderBalanceByEmail|extractFromCustomerBalanceByEmail)/
  })
  invokeBeforeMethodStaticMethod(meta: Metadata) {

    const args = JSON.stringify(meta.method.args);

    Runner.runInSession(() => {
      Logger.info({ message: `Running in session`, user: `MySql Runner at ${meta.className}`, method: `${meta.method.name}`, args: `${args}`});
      meta.method.invoke(...meta.method.args);
    });

    meta.method.proceed = false;
    // Runner.runInSession(() => {
    //   meta.method.invoke(meta.method.args);
    // })

    // const args = JSON.stringify(meta.method.args);
    // Logger.info({ message: `Called ${meta.className}`, method: `${meta.method.name}`, args: `${args}` });1
  }
}