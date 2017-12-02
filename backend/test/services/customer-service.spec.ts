import { CustomerService } from "./../../src/services/customer-service";
import { Customer } from "./../../src/models/customer";
import { MongoDBClient } from "./../../src/config/mongodb/client";
import { expect } from "chai";
import "mocha";
import { mock, instance, when, verify, anyString, anything, anyFunction } from "ts-mockito";

let customerService;
let mongoClient;
let userService;
let dummyCustomer;

beforeEach(() => {

  mongoClient = mock(MongoDBClient);
  customerService = new CustomerService (mongoClient, userService);
});

describe("A Customer Service when it's created", () => {
  it("should not be null", () => {
    expect(customerService).to.not.equal("undefined" || null);
  });

  it("should reference a 'customer' collection", () => {
    expect(customerService.collection).equals("customer");
  });
});

describe("A Customer Service when getCustomerByCUIT is called", () => {
  it("should call findOneByProperty on mongoClient", () => {
    customerService.getCustomerByCUIT("20343687878", () => {
      verify(mongoClient.findOneByProperty(anyString(), anything(), anyFunction())).once();
    });
  });
});

describe("A Customer Service when updateCustomerByCUIT is called", () => {
  it("should call updateByProperty on mongoClient", () => {
    customerService.updateCustomerByCUIT("20343687878", Object, () => {
      verify(mongoClient.updateByProperty).once();
    });
  });
});

describe("A Customer Service when deleteCustomerByCUIT is called", () => {
  it("should call removeByProperty on mongoClient", () => {
    customerService.deleteCustomerByCUIT("20343687878", () => {
      verify(mongoClient.removeByProperty).once();
    });
  });
});

describe("A Customer Service when newCustomer is called with no email", () => {
  it("should call insert on mongoClient and throw an error", () => {
    try {
      expect(customerService.newCustomer(dummyCustomer)).to.throw();
      verify(mongoClient.insert(anyString(), dummyCustomer)).once();
    }
    catch (err) {}
  });
});
