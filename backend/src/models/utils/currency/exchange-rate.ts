import * as fs from "fs";
import * as path from "path";

export class ExchangeRate {

  public static convert(currencyName: string, amount: number) {

    let ratesPath = path.join(__dirname + "./../../../../private/data/", "exchange-rates.json");
    let exchangeRates;
    exchangeRates = JSON.parse(fs.readFileSync(ratesPath, "utf-8"));
    let currentRate = exchangeRates.rates[currencyName];
    const result = amount * currentRate
    return parseFloat(result.toFixed(2));
  }
}