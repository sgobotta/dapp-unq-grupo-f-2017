import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { MenuService } from "./../services/menu-service";
import Menu from "./../models/menu";
import { Request } from "express";
import TYPES from "./../constants/types";

@injectable()
@controller("/menu")
export class MenuController {

  constructor(@inject(TYPES.MenuService) private menuService: MenuService) { }

  @httpGet("/")
  public getMenus(): Promise<Menu[]> {
    return this.menuService.getMenus();
  }

  @httpGet("/:id")
  public getMenu(request: Request): Promise<Menu> {
    return this.menuService.getMenu(request.params.id);
  }

  @httpPost("/")
  public newMenu(request: Request): Promise<Menu> {
    return this.menuService.newMenu(request.body);
  }

  @httpPut("/:id")
  public updateMenu(request: Request): Promise<Menu> {
    return this.menuService.updateMenu(request.params.id, request.body);
  }

  @httpDelete("/:id")
  public deleteMenu(request: Request): Promise<Menu> {
    return this.menuService.deleteMenu(request.params.id);
  }
}
