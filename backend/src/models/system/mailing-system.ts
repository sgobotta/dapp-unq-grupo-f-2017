import * as schedule from "node-schedule";
import * as mailgun from "mailgun-js";

export class MailingSystem {

  constructor() {}

  public startJobs() {
    schedule.scheduleJob("* * 0 * * *", () => {

      this.sendEmail();
      console.log("This is a midnight log");
    });
  }

  sendEmail() {

    var api_key = 'key-0bd4b5d729416d246e38a999f9e78a89';
    var domain = 'morfi-ya.grupo-f.com';
    var mg = mailgun({apiKey: api_key, domain: domain});

    var data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'sgobotta@gmail.com, juanma.rdefago@gmail.com, discosdevictoria@gmail.com',
      subject: 'Ghost Booh',
      text: 'Testing some Mailgun awesomness!'
    };

    mg.messages().send(data, function (error, body) {
      console.log(body);
    });

  }

}
