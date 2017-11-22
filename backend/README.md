# Desarrollo de Aplicaciones - UNQ - Segundo Cuatrimestre 2017

## Morfi Ya!

### Backend Webservices

#### Balance Services

*  **GET** "/balance/provider/:mail" *getProviderBalance*
*  **PUT** "/balance/provider/:mail/:amount" *updateProviderBalance*
*  **GET** "/balance/customer/:cuit" *getCustomerBalance*
*  **PUT** "/balance/customer/:cuit/:amount" *updateCustomerBalance*
*  **POST** "/balance/provider" *newProviderBalance*
*  **POST** "/balance/customer" *newCustomerBalance*

#### Menu Services

*  **GET** "/menu/" *getMenus*
*  **POST** "/menu/:name" *getMenusWithName*
*  **GET** "/menu/:id" *getMenu*
*  **POST** "/menu/" *newMenu*
*  **PUT** "/menu/:id" *updateMenu*
*  **DELETE** "/menu/:id" *deleteMenu*

#### Customer Services

*  **GET** "/customer/:cuit" *getCustomer*
*  **PUT** "/customer/:cuit" *updateCustomer*
*  **DELETE** "/customer/:cuit" *deleteCustomer*
*  **POST** "/customer/" *newCustomer*

#### Provider Services

*  **GET** "/provider/:email" *getProvider*
*  **PUT** "/provider/:email" *updateProvider*
*  **DELETE** "/provider/:email" *deleteProvider*
*  **POST** "/provider/" *newProvider*

#### User Services

*  **GET** "/users/:email" *getUser*
*  **PUT** "/users/:email" *updateUser*
*  **DELETE** "/users/:email" *deleteUser*
*  **POST** "/users/" *newUser*

