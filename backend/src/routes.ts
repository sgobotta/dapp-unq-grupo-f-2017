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
import { UserController } from "./controllers/user-controller";
import { UserService } from "./services/user-service";
import { AuthorizationController } from "./controllers/authorization-controller";
import { AuthorizationService } from "./services/authorization-service";
import { OrderController } from "./controllers/order-controller";
import { OrderService } from "./services/order-service";
import { PurchaseController } from "./controllers/purchase-controller";
import { PurchaseService } from "./services/purchase-service";

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

    container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed(TAGS.UserController);
    container.bind<UserService>(TYPES.UserService).to(UserService);

    container.bind<interfaces.Controller>(TYPE.Controller).to(AuthorizationController).whenTargetNamed(TAGS.AuthorizationController);
    container.bind<AuthorizationService>(TYPES.AuthorizationService).to(AuthorizationService);

    container.bind<interfaces.Controller>(TYPE.Controller).to(OrderController).whenTargetNamed(TAGS.OrderController);
    container.bind<OrderService>(TYPES.OrderService).to(OrderService);

    container.bind<interfaces.Controller>(TYPE.Controller).to(PurchaseController).whenTargetNamed(TAGS.PurchaseController);
    container.bind<PurchaseService>(TYPES.PurchaseService).to(PurchaseService);
  }

}
