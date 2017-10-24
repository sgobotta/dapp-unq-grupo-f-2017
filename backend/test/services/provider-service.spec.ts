import { ProviderService } from "./../../src/services/provider-service";
import { Provider } from "./../../src/models/provider";
import { MongoDBClient } from "./../../src/config/mongodb/client";
import { expect } from "chai";
import "mocha";
import { mock, instance, when, verify, anyString } from "ts-mockito";

let providerService;
let mongoClient;
let dummyProvider;

beforeEach(() => {

  mongoClient = mock(MongoDBClient);
	providerService = new ProviderService(mongoClient);
});

describe("A Provider Service when it's created", () => {
  it("should not be null", () => {
    expect(providerService).to.not.equal("undefined" || null);
  });

  it("should reference a 'provider' collection", () => {
    expect(providerService.collection).equals("provider");
  });
});

describe("A Provider Service when getProviderByEMail is called", () => {
  it("should call findOneByProperty on mongoClient", () => {
    providerService.getProviderByEMail("maybean@email.why", () => {
      verify(mongoClient.findOneByProperty).once();
    });
  });
});

describe("A Provider Service when updateProviderByEMail is called", () => {
  it("should call updateByProperty on mongoClient", () => {
    providerService.updateProviderByEMail("maybean@email.why", Object, () => {
      verify(mongoClient.updateByProperty).once();
    });
  });
});

describe("A Provider Service when deleteProviderByEMail is called", () => {
  it("should call removeByProperty on mongoClient", () => {
    providerService.deleteProviderByEMail("maybean@email.why", () => {
      verify(mongoClient.removeByProperty).once();
    });
  });
});

describe("A Provider Service when newCustomer is called", () => {
  it("should call insert on mongoClient", () => {
    providerService.newProvider(dummyProvider, () => {
      verify(mongoClient.insert("collection", dummyProvider)).once();
    });
  });
});
