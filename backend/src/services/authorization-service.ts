import { inject, injectable } from "inversify";
import * as _ from "lodash";
import { MongoDBClient } from "../config/mongodb/client";
import TYPES from "./../constants/types";
import { User, UserBuilder, Session, SessionBuilder } from "../models/user";

@injectable()
export class AuthorizationService {

  private mongoClient: MongoDBClient;
  private collection: string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
  ) {
    this.mongoClient = mongoClient;
    this.collection = "users";
  }

  public login(email: string, password: string): Promise<LoginResponse> {
    return new Promise<LoginResponse>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: email}, (error, user: User) => {
        if (user) {
          let newUser;
          try {
            newUser = new UserBuilder()
              .withEmail(user.email)
              .withPassword(user.password)
              .withPasswordRepeat(password)
              .withSession(user.email)
              .build();
            newUser.passwordMatch(password);
            this.resetToken(user.email)
              .then((response) => {
                resolve({ success: true, session: response.session, user: user });
              })
              .catch((response) => {
                reject({ success: false, msg: response });
              });
          }
          catch (err) {
            reject({ success: false, msg: err });
          }
        }
      })
    })
  }

  private resetToken(email: string): Promise<TokenResetResponse> {
    console.log(email)
    return new Promise<TokenResetResponse>((resolve, reject) => {
      const session = new SessionBuilder()
        .withToken(email)
        .withExpireDate()
        .build();
        console.log(session)
      this.mongoClient.updateByProperty(this.collection, { email: email }, { session: session }, (err, res) => {
        if (err) reject(err.msg);
        if (res) resolve({ session: session });
      });
    });
  }
}

export interface LoginResponse {
  success: boolean;
  session: Session;
  user: User;
}

export interface TokenResetResponse {
  session: Session;
}
