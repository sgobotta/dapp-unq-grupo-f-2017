import * as schedule from "node-schedule";

export class MailingSystem {

  constructor() {}

  public startJobs() {
    schedule.scheduleJob("30 * * * * *", function() {
      console.log("This is a midnight log");
    });
  }

}
