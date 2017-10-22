import { Provider } from "./../../src/models/provider";
import { expect } from "chai";
import "mocha";

describe("Provider class when it's created", () => {
  it("should return email validation error", () => {

    expect(() => {
      new Provider(null, null, null, null, null, null, null, null, null, null)
    }).to.throw(Error, "ERROR ::: Provided e-mail is not valid.");
  });
});
