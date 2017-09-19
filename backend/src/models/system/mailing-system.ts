import * as schedule from "node-schedule";
import * as mailgun from "mailgun-js";

export class MailingSystem {

  private apiKey:string;
  private domain:string;
  private mailgun:mailgun;

  constructor() {
    this.apiKey = process.env.MAILGUN_API_KEY || "key-0bd4b5d729416d246e38a999f9e78a89";
    this.domain = process.env.MAILGUN_DOMAIN || "sandboxb160e24069e44b659ad8ee54ff91f818.mailgun.org";

    this.mailgun = mailgun({apiKey: this.apiKey, domain: this.domain});
  }

  public startJobs() {
    schedule.scheduleJob("* * 0 * * *", () => {

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

  sendEmail(sender, recipients, subject, text, html) {

    let data = {
      from: sender,
      to: recipients,
      subject: subject,
      text: text
    };

    this.mailgun.messages().send(data, function(error, body) {
      if(error) {
        console.log(error);
      } else {
        console.log(body);
      }
    });

  }

}
