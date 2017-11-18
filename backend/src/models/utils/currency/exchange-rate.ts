import * as fs from "fs";
import * as path from "path";

export class ExchangeRate {

  public static convert(currencyName: string, amount: number) {

    const exchangeRates = JSON.parse(fs.readFileSync(path.join(__dirname + "./../../../../private/data/", "exchange-rates.json"), "utf8"));
    let currentRate = exchangeRates.rates[currencyName];
    return amount * currentRate;
  }
}