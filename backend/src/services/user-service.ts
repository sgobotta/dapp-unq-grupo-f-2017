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

  public getUserByEmail(email: string): Promise<UserResponse> {
    return new Promise<UserResponse>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: email }, (error, user: User) => {
        if (user) {
          this.tokenExpired(user)
          .then((result) => {
            reject({ success: !result, msg: "Token has expired." });
          })
          .catch((result) => {
            if (!result) resolve({ success: true, data: user });
            else resolve({ success: false, data: "Error while getting user." });
          });
        } else {
          reject({ success: false, msg: "User not found." });
        }
      });
    });
  }

  public updateUserByEmail(email: string, user: User): Promise<UserResponse> {
    return new Promise<UserResponse>((resolve, reject) => {
      this.mongoClient.updateByProperty(this.collection, { email: email }, user, (error, user: User) => {
        if (error) {
          reject({ success: false, msg: "Error while updating" });
        }
        else if (user) {
          resolve({ success: true, data: user });
        }
      });
    });
  }

  public deleteUserByEmail(email: string): Promise<UserResponse> {
    return new Promise<UserResponse>((resolve, reject) => {
      this.mongoClient.removeByProperty(this.collection, { email: email }, (error, user: any) => {
        if (error) {
          reject({ success: false, msg: "Error while deleting." });
        } else if (user)  {
          resolve({ success: true, data: "User has been deleted. Bye bye ~" });
        }
      });
    });
  }

  public newUser(user: User): Promise<UserResponse> {
    return new Promise<UserResponse>((resolve, reject) => {
      let newUser: User;
      try {
        this.userExists(user.email)
        .then((result) => {
          reject({ success: !result, msg: "User already exists."});
        })
        .catch((result) => {
          newUser = new UserBuilder()
          .withEmail(user.email)
          .withPassword(user.password)
          .withPasswordRepeat(user.passwordRepeat)
          .withSession(user.session.token)
          .withRoles(user.roles)
          .build();
          this.mongoClient.insert(this.collection, newUser, (error, user: User) => {
            if (error) {
              reject({ success: result, msg: "Insertion error." });
            }
            else if (user) {
              resolve({ success: !result, data: user });
            }
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
      this.mongoClient.findOneByProperty(this.collection, { email: email }, (error, user: User) => {
        if (user) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  private tokenExpired(user: User) {
    return new Promise<Boolean>((resolve, reject) => {
      this.mongoClient.findOneByProperty(this.collection, { email: user.email }, (error, result: User) => {
        if (result) {
          const today = new Date;
          const res = result.session.expireDate < today;
          if (res) resolve(true);
          else reject(false);
        } else  {
          reject(false);
        }
      });
    });
  }
}

export interface UserResponse {
  success: boolean;
  data: any;
}