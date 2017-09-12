import { Provider } from "./../../src/models/provider";
import { expect } from "chai";
import "mocha";

describe("Provider class when it's created", () => {
  it("should not be null", () => {
    const provider = new Provider();
    expect(provider).to.not.equal("undefined");
  });
});
