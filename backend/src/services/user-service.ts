import { inject, injectable } from "inversify";
import * as _ from "lodash";
import { MongoDBClient } from "../config/mongodb/client";
import TYPES from "./../constants/types";
import { User, UserBuilder } from "../models/user";
import { CustomerService } from "./customer-service";
import { ProviderService } from "./provider-service";

@injectable()
export class UserService {

  private mongoClient: MongoDBClient;
  private collection: string;

  constructor(
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient,
    @inject(TYPES.MongoDBClient) customerService: CustomerService,
    @inject(TYPES.MongoDBClient) ProviderService: ProviderService
  ) {
    this.mongoClient = mongoClient;
    this.collection = "users";
  }

  public getUserByEmail(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: email }, (error, data: User) => {
        if (data) {
          const user = new UserBuilder()
          .withEmail(data.email)
          .withPassword(data.password)
          .withSession(data.session.token)
          .withRoles(data.roles)
          .build();
          if (!user.session.tokenExpired()) {
            resolve({ success: true, data });
          } else {
            reject({ success: false, msg: "User not found." });
          }
        } else {
          reject({ success: false, msg: "User not found." });
        }
      });
    });
  }

  public updateUserByEmail(email: string, user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.updateByProperty(this.collection, { email: email }, user, (error, data: User) => {
        resolve(data);
      });
    });
  }

  public deleteUserByEmail(email: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.removeByProperty(this.collection, { email: email }, (error, data: any) => {
        resolve(data);
      });
    });
  }

  public newUser(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let newUser: User;
      try {
        this.userExists(user.email)
        .then((result) => {
          reject({ success: result, msg: "User already exists."});
        })
        .catch((result) => {
          newUser = new UserBuilder()
          .withEmail(user.email)
          .withPassword(user.password)
          .withPasswordRepeat(user.passwordRepeat)
          .withSession(user.session.token)
          .withRoles(user.roles)
          .build();
          this.mongoClient.insert(this.collection, newUser, (error, data: User) => {
            resolve({ success: result, data });
          });
        });
      }
      catch (err) {
        console.log(err);
        return null;
      }
    });
  }

  private userExists(email: string) {
    return new Promise<Boolean>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: email }, (error, data: User) => {
        if (data) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    })
  }
}
