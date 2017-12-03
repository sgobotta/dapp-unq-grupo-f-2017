import { MAILGUN_CONFIG } from "./config";
import * as schedule from "node-schedule";
import * as mailgun from "mailgun-js";
import { injectable } from "inversify";
import { Mail } from "./../../models/mail/mail";
import { PurchaseMail } from "./../../models/mail/purchase-mail";
import { SaleMail } from "./../../models/mail/sale-mail";

@injectable()
export class MailingClient {

  private apiKey:string;
  private domain:string;
  private mailgun:mailgun;

  constructor() {
    this.apiKey = MAILGUN_CONFIG.apiKey;
    this.domain = MAILGUN_CONFIG.domain;

    this.mailgun = mailgun({apiKey: this.apiKey, domain: this.domain});
  }

  public notifyAll(purchaseMail: Mail, saleMail: Mail) {
    return new Promise<any>((resolve, reject) => {
      this.sendEmail(purchaseMail)
      .then((purchaseMailResponse) => {
        this.sendEmail(saleMail)
        .then((saleMailResponse) => {
          resolve(purchaseMailResponse && saleMailResponse);
        })
        .catch((error) => { reject(error) });
      })
      .catch((error) => { reject(error) });
    });
  }

  public sendEmail(mail: Mail) {
    return new Promise<any>((resolve, reject) => {
      let data = {
        from: mail.getFrom(),
        to: mail.getTo(),
        subject: mail.getSubject(),
        text: mail.getText()
      };

      this.mailgun.messages().send(mail, function(error, body) {
        if(error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    })

  }

}
