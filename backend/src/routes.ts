import { injectable, Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import "reflect-metadata";
import TYPES from "./constants/types";
import TAGS from "./constants/tags";
import { MenuController } from "./controllers/menu-controller";
import { MenuService } from "./services/menu-service";
import { ProviderController } from "./controllers/provider-controller";
import { ProviderService } from "./services/provider-service";
import { CustomerController } from "./controllers/customer-controller";
import { CustomerService } from "./services/customer-service";
import { BalanceController } from "./controllers/balance-controller";
import { BalanceService } from "./services/balance-service";

@injectable()
export default class Routes {

  constructor() {

  }

  public setup(container: Container) {

    container.bind<interfaces.Controller>(TYPE.Controller).to(MenuController).whenTargetNamed(TAGS.MenuController);
    container.bind<MenuService>(TYPES.MenuService).to(MenuService);

    container.bind<interfaces.Controller>(TYPE.Controller).to(ProviderController).whenTargetNamed(TAGS.ProviderController);
    container.bind<ProviderService>(TYPES.ProviderService).to(ProviderService);

    container.bind<interfaces.Controller>(TYPE.Controller).to(CustomerController).whenTargetNamed(TAGS.CustomerController);
    container.bind<CustomerService>(TYPES.CustomerService).to(CustomerService);

    container.bind<interfaces.Controller>(TYPE.Controller).to(BalanceController).whenTargetNamed(TAGS.BalanceController);
    container.bind<BalanceService>(TYPES.BalanceService).to(BalanceService);
  }

}
