const TYPES = {
  MySQLClient: Symbol("MySQLClient"),
  MongoDBClient: Symbol("MongoDBClient"),
  DBStartup: Symbol("DBStartup"),
  MenuService: Symbol("MenuService"),
  CustomerService: Symbol("CustomerService"),
  ProviderService: Symbol("ProviderService"),
  BalanceService: Symbol("BalanceService"),
  UserService: Symbol("UserService"),
  AuthorizationService: Symbol("AuthorizationService"),
  OrderService: Symbol("OrderService"),
  PurchaseService: Symbol("PurchaseService"),
  MailingService: Symbol("MailingService"),
  MailingClient: Symbol("MailingClient")
};

export default TYPES;
