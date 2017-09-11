import Currency from "./utils/currency";

export default class Menu {

  name: string;
  description: string;
  category: [string];
  deliveryPrice: Currency;
  validityRange: [Date];
  deliveryTimeRange: [Date];
  price: Currency;
  minQuantity: number;
  minQuantityPrice: Currency;
  maxDailySalesQuantity: number;

  constructor() {

  }
}
