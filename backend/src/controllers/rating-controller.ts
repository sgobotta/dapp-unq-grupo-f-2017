import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { RatingService, RatingResponse } from "../services/rating-service";
import { Request, Response } from "express";
import TYPES from "../constants/types";
import { User } from "../models/user";


@injectable()
@controller("/rating")
export class RatingController {

  constructor(@inject(TYPES.RatingService) private ratingService: RatingService) {}

  @httpPut("/")
  public updateRatingByEmail(request: Request): Promise<RatingResponse> {
    return this.ratingService.updateRatingByEmail(request.body.email, request.body.rate)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpGet("/:email")
  public getRatingByEmail(request: Request): Promise<RatingResponse> {
    return this.ratingService.getRatingByEmail(request.params.email)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

}
