import { MenuService } from "./../../src/services/menu-service";
import { Menu } from "./../../src/models/menu";
import { MongoDBClient } from "./../../src/config/mongodb/client";
import { MySQLClient } from "./../../src/config/mysql/client";
import { expect } from "chai";
import "mocha";
import { mock, instance, when, verify, anyString } from "ts-mockito";

let menuService;
let dummyMongoClient;
let dummySqlClient;
let dummyMenu;

beforeEach(() => {

  dummyMongoClient = mock(MongoDBClient);
  dummySqlClient = mock(MySQLClient);
  dummyMenu = mock(Menu);

	menuService = new MenuService (dummyMongoClient, dummySqlClient);
});

describe("A Menu Service when it's created", () => {
  it("should not be null", () => {
    expect(menuService).to.not.equal("undefined" || null);
  });

  it("should reference a 'menu' collection", () => {
    expect(menuService.collection).equals("menu");
  });
});

describe("A Menu Service when getMenus is called", () => {
  it("should call find on mongoClient", () => {
    menuService.getMenus(() => {
      verify(dummyMongoClient.find).once();
    });
  });
});

describe("A Menu Service when getMenusWithName is called", () => {
  it("should call findWithPattern on mongoClient", () => {
    menuService.getMenusWithName(anyString(), () => {
      verify(dummyMongoClient.findWithPattern).once();
    });
  });
});

describe("A Menu Service when getMenu is called", () => {
  it("should call findOneById on mongoClient", () => {
    menuService.getMenu(anyString(), () => {
      verify(dummyMongoClient.findOneById).once();
    });
  });
});

describe("A Menu Service when getMenuByName is called", () => {
  it("should call findOneByProperty on mongoClient", () => {
    menuService.getMenuByName(anyString(), () => {
      verify(dummyMongoClient.findOneByProperty).once();
    });
  });
});

describe("A Menu Service when newMenu is called", () => {
  it("should call insert on mongoClient", () => {
    menuService.newMenu(dummyMenu, () => {
      verify(dummyMongoClient.insert).once();
    });
  });
});

describe("A Menu Service when updateMenu is called", () => {
  it("should call update on mongoClient", () => {
    menuService.updateMenu(anyString(), () => {
      verify(dummyMongoClient.findOneById).once();
    });
  });
});

describe("A Menu Service when deleteMenu is called", () => {
  it("should call remove on mongoClient", () => {
    menuService.deleteMenu(anyString(), () => {
      verify(dummyMongoClient.remove).once();
    });
  });
});
