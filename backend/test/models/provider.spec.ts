import { Provider } from "./../../src/models/provider";
import { expect } from "chai";
import "mocha";

describe("Provider class when it's created", () => {
  it("should return email validation error if an email was not passed", () => {
    try {
      expect(() => {
        new Provider(null, null, null, null, null, "abc@abc.com", null, null, null, null);
      }).not.to.throw(Error);
    }
    catch(err) {
      expect(() => {
        new Provider(null, null, null, null, null, null, null, null, null, null);
      }).to.throw(Error);
    }
  });
});
