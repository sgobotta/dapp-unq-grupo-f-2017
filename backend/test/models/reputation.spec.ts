import { Reputation } from "./../../src/models/reputation";
import { expect } from "chai";
import "mocha";

let reputation;

beforeEach(() => {

	reputation = new Reputation();
});

describe("Reputation class when it's created", () => {
  it("averageRating attribute must be null", () => {
    expect(reputation.getRating()).to.equal(null);
  });

  it("quantity attribute must be null", () => {
    expect(reputation.quantity).to.equal(null);
  });
});

describe("On rate(10), when reputation is rated for the first time", () => {
  it("quantity attribute must be 1", () => {
    reputation.rate(10);
    expect(reputation.quantity).to.equal(1);
  });
  it("averageRating must be 10", () => {
    reputation.rate(10);
    expect(reputation.getRating()).to.equal(10);
  });
});

describe("On rate(10), when reputation has been previously rated", () => {
  it("quantity is increased by 1", () => {
    reputation.rate(1);
    reputation.rate(10);
    expect(reputation.quantity).to.equal(2);
  });
  it("averageRating is calculated", () => {
    reputation.rate(1);
    reputation.rate(10);
    expect(reputation.averageRating).to.equal(5.5);
  });
});
