import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { MenuService, MenuResponse, MenuListResponse } from "./../services/menu-service";
import { Menu } from "./../models/menu";
import { Request, Response } from "express";
import TYPES from "./../constants/types";

@injectable()
@controller("/menu")
export class MenuController {

  constructor(@inject(TYPES.MenuService) private menuService: MenuService) { }

  @httpGet("/")
  public getMenus(): Promise<MenuListResponse> {
    return this.menuService.getMenus()
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPost("/:name")
  public getMenusWithName(request: Request): Promise<MenuListResponse> {
    return this.menuService.getMenusWithName(request.params.name)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPost("/category/:categories")
  public getMenusWithCategory(request: Request): Promise<MenuListResponse> {
    return this.menuService.getMenusWithName(request.body)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpGet("/:id")
  public getMenu(request: Request): Promise<MenuResponse> {
    return this.menuService.getMenu(request.params.id)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPost("/")
  public newMenu(request: Request): Promise<MenuResponse> {
    return this.menuService.newMenu(request.body)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpPut("/:id")
  public updateMenu(request: Request): Promise<MenuResponse> {
    return this.menuService.updateMenu(request.params.id, request.body)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }

  @httpDelete("/:id")
  public deleteMenu(request: Request): Promise<MenuResponse> {
    return this.menuService.deleteMenu(request.params.id)
      .then((response) => { return response; })
      .catch((response) => { return response; });
  }
}
