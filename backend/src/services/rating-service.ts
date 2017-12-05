import { inject, injectable } from "inversify";
import * as _ from "lodash";
import { MongoDBClient } from "../config/mongodb/client";
import TYPES from "./../constants/types";
import { User, UserBuilder } from "../models/user";
import { Wove } from "aspect.js";

@Wove()
@injectable()
export class RatingService {

  private mongoClient: MongoDBClient;
  private collection: string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
  ) {
    this.mongoClient = mongoClient;
    this.collection = "ratings";
  }

  public updateRatingByEmail(email: string, rate: Rate): Promise<RatingResponse> {
    return new Promise<RatingResponse>((resolve, reject) => {
      let operation;
      if (rate.status === "negative") operation = -1
      if (rate.status === "positive") operation = 1
      this.mongoClient.updateNotSetByProperty(this.collection, { email: email }, { $inc: { rate: operation }}, (error, data: any) => {
        if (error) {
          reject({ success: false, msg: "Error while rating" });
        }
        else if (data) {
          this.getRatingByEmail(email)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            })
        }
      });
    });
  }

  public getRatingByEmail(email: string): Promise<RatingResponse> {
    return new Promise<RatingResponse>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: email }, (error, rate: any) => {
        if (error) {
          reject({ success: false, msg: "Error while getting ratings" });
        }
        else if (rate) {
          resolve({ success: true, data: rate });
        }
      });
    });
  }

}

export interface RatingResponse {
  success: boolean;
  data: any;
}

interface Rate {
  status: string;

}