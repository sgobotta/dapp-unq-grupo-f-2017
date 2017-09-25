import { injectable, Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import "reflect-metadata";
import TYPES from "./constants/types";
import TAGS from "./constants/tags";
import { MenuController } from "./controllers/menu-controller";
import { MenuService } from "./services/menu-service";

@injectable()
export default class Routes {

  constructor() {

  }

  public setup(container:Container) {

    container.bind<interfaces.Controller>(TYPE.Controller).to(MenuController).whenTargetNamed(TAGS.MenuController);
    container.bind<MenuService>(TYPES.MenuService).to(MenuService);

  }

}
