import { aroundStaticMethod, aroundMethod, beforeMethod, Wove, Metadata } from "aspect.js";
import Logger from "../../logger/logger";
import { Runner } from "./runner";

export class RunnerAspect {
  @beforeMethod({
    classNamePattern: /^BalanceService/,
    methodNamePattern: /^(getProviderBalanceByEmail|getCustomerBalanceByCUIT|newProviderBalance|depositToProviderBalanceByEmail|extractFromCustomerBalanceByEmail|updateCustomerBalanceByCUIT)/
  })
  invokeBeforeMethodStaticMethod(meta: Metadata) {

    const args = JSON.stringify(meta.method.args);

    new Runner().runInSession(() => {
      // Logger.info({ message: `Called ${meta.className}`, method: `${meta.method.name}`, args: `${args}`});
      meta.method.invoke(...meta.method.args);
    });
    meta.method.proceed = false;
  }
}