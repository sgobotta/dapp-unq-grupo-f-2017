import { BalanceService } from "./../../src/services/balance-service";
import { MySQLClient } from "./../../src/config/mysql/client";
import { expect } from "chai";
import "mocha";
import { mock, instance, when, verify, anyString, anything, anyFunction, anyNumber } from "ts-mockito";

let balanceService;
let mySqlClient;

beforeEach(() => {

  mySqlClient = mock(MySQLClient);
  balanceService = new BalanceService (mySqlClient);
});

describe("A Balance Service when it's created", () => {
  it("should not be null", () => {
    expect(balanceService).to.not.equal("undefined" || null);
  });

  it("should reference a 'ProviderBalance' collection", () => {
    expect(balanceService.providerCollection).equals("ProviderBalance");
  });

  it("should reference a 'CustomerBalance' collection", () => {
    expect(balanceService.customerCollection).equals("CustomerBalance");
  });
});

describe("A Balance Service when getProviderBalanceByEmail is called", () => {
  it("should call findOneByProperty on mySqlClient", () => {
    balanceService.getProviderBalanceByEmail(anyString(), () => {
      verify(mySqlClient.findOneByProperty(anyString(), anything(), anyFunction())).once();
    });
  });
});

describe("A Balance Service when getCustomerBalanceByCUIT is called", () => {
  it("should call findOneByProperty on mySqlClient", () => {
    balanceService.getCustomerBalanceByCUIT(anyNumber(), () => {
      verify(mySqlClient.findOneByProperty(anyString(), anything(), anyFunction())).once();
    });
  });
});


describe("A Balance Service when newProviderBalance is called", () => {
  it("should call insertOne on mySqlClient", () => {
    balanceService.getCustomerBalanceByCUIT(anyNumber(), () => {
      verify(mySqlClient.insertOne(anyString(), anything(), anyFunction())).once();
    });
  });
});

describe("A Balance Service when newCustomerBalance is called", () => {
  it("should call insertOne on mySqlClient", () => {
    balanceService.newCustomerBalance(anyNumber(), () => {
      verify(mySqlClient.insertOne(anyString(), anything(), anyFunction())).once();
    });
  });
});

describe("A Balance Service when depositToProviderBalanceByEmail is called", () => {
  it("should call updateOneByProperty on mySqlClient", () => {
    balanceService.depositToProviderBalanceByEmail(anyString(), () => {
      verify(mySqlClient.updateOneByProperty(anyString(), anything(), anyFunction())).once();
    });
  });
});


describe("A Balance Service when extractFromCustomerBalanceByEmail is called", () => {
  it("should call updateOneByProperty on mySqlClient", () => {
    balanceService.extractFromCustomerBalanceByCUIT(anyString(), () => {
      verify(mySqlClient.updateOneByProperty(anyString(), anything(), anyFunction())).once();
    });
  });
});

