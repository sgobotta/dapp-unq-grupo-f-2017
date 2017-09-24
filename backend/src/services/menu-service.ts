import Menu from "./../models/menu";
import { injectable } from "inversify";
import { IMenu } from "./interfaces";

@injectable()
export class MenuService {

  private menuStorage: IMenu[] = [
    { name: 'Lorem' },
    { name: 'Dolor' }
  ];

  public getUsers(): IMenu[] {
    return this.menuStorage;
  }

  public getMenu(id: string): IMenu {
    let result: IMenu;
    this.menuStorage.map(menu => {
      if (menu.name === id) {
        result = menu;
      }
    });

    return result;
  }

  public newMenu(menu: IMenu): IMenu {
    this.menuStorage.push(menu);
    return menu;
  }

  public updateMenu(id: string, menu: IMenu): IMenu {
    this.menuStorage.map((entry, index) => {
      if (entry.name === id) {
        this.menuStorage[index] = menu;
      }
    });

    return menu;
  }

  public deleteMenu(id: string): string {
    let updatedMenu: IMenu[] = [];
    this.menuStorage.map(user => {
      if (user.name !== id) {
        updatedMenu.push(user);
      }
    });

    this.menuStorage = updatedMenu;
    return id;
  }
}
