import { MAILGUN_CONFIG } from "./config";
import * as schedule from "node-schedule";
import * as mailgun from "mailgun-js";
import { injectable } from "inversify";

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

  public startJobs() {
    schedule.scheduleJob("* 0 * * *", () => {

      let data = {
        from: "Morfi Ya! <midnight-schedule@morfi-ya.food.store>",
        to: "sgobotta@gmail.com",
        subject: "Midnight Schedule",
        text: "Testing some Mailgun awesomness!"
      };

      this.sendEmail(data.from, data.to, data.subject, data.text, null);
      console.log("This is a midnight log");
    });
  }

  public sendEmail(sender, recipients, subject, text, html) {
    new Promise<any>((resolve, reject) => {
      let data = {
        from: sender,
        to: recipients,
        subject: subject,
        text: text
      };

      this.mailgun.messages().send(data, function(error, body) {
        if(error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    })

  }

}
