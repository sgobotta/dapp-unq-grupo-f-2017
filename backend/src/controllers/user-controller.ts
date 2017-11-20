import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { UserService, UserResponse } from "../services/user-service";
import { Request, Response } from "express";
import TYPES from "../constants/types";
import { User } from "../models/user";


@injectable()
@controller("/users")
export class UserController {

  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet("/:email")
  public getUser(request: Request): Promise<UserResponse> {
    return this.userService.getUserByEmail(request.params.email)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPut("/:email")
  public updateUser(request: Request): Promise<UserResponse> {
    return this.userService.updateUserByEmail(request.params.email, request.body)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpDelete("/:email")
  public deleteUser(request: Request): Promise<UserResponse> {
    return this.userService.deleteUserByEmail(request.params.email)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPost("/")
  public newUser(request: Request, response: Response): Promise<UserResponse> {
    return this.userService.newUser(request.body)
      .then((response) => { return(response); })
      .catch((response) => { return(response); });
  }
}
