import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { MenuService } from './../services/menu-service';
import { IMenu } from "./../services/interfaces";
import { Request } from 'express';
import TYPES from './../constants/types';

@injectable()
@controller('/menu')
export class MenuController {

  constructor(@inject(TYPES.MenuService) private menuService: MenuService) { }

  @httpGet('/')
  public getUsers(): IMenu[] {
    return this.menuService.getUsers();
  }

  @httpGet('/:id')
  public getUser(request: Request): IMenu {
    return this.menuService.getMenu(request.params.id);
  }

  @httpPost('/')
  public newUser(request: Request): IMenu {
    return this.menuService.newMenu(request.body);
  }

  @httpPut('/:id')
  public updateUser(request: Request): IMenu {
    return this.menuService.updateMenu(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): string {
    return this.menuService.deleteMenu(request.params.id);
  }
}
