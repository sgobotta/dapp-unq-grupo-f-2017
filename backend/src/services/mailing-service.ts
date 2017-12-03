import { inject, injectable } from "inversify";
import { MailingClient } from "../config/mailing-system/client";
import { Order } from "./../models/order";
import { PurchaseMail, PurchaseMailBuilder } from "./../models/mail/purchase-mail";
import { SaleMail, SaleMailBuilder } from "./../models/mail/sale-mail";
import TYPES from "./../constants/types";
import { Wove } from "aspect.js";

@Wove()
@injectable()
export class MailingService {

  private mailingClient: MailingClient;

  constructor(
    @inject(TYPES.MailingClient) mailingClient: MailingClient,
  ) {
    this.mailingClient = mailingClient;
  }

  public notifyPurchase(customerMail: string, providerMail: string, order: Order): Promise<MailingResponse> {
    return new Promise<MailingService>((resolve, reject) => {
      const purchaseMail = new PurchaseMailBuilder()
        .withConsignee(customerMail)
        .withMenuName(order.menu.name)
        .withQuantity(order.quantity)
        .withMenuDescription(order.menu.description)
        .withPrice(order.menu.price)
        .withDeliveryPrice(order.menu.deliveryPrice)
        .withFinalPrice(order.getFinalPrice())
        .withDeliveryTime(order.deliveryTime)
        .withDeliveryType(order.deliveryType)
        .build();
      const saleMail = new SaleMailBuilder()
        .withConsignee(customerMail)
        .withMenuName(order.menu.name)
        .withQuantity(order.quantity)
        .withMenuDescription(order.menu.description)
        .withPrice(order.menu.price)
        .withDeliveryPrice(order.menu.deliveryPrice)
        .withFinalPrice(order.getFinalPrice())
        .withDeliveryTime(order.deliveryTime)
        .withDeliveryType(order.deliveryType)
        .build();

      this.mailingClient.notifyAll(purchaseMail, saleMail)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

}


export interface MailingResponse {

}