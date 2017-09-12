import { Server } from "./../src/server";
import Routes from "./../src/routes";
import { MailingSystem } from "./../src/models/system/mailing-system";
import { expect } from "chai";
import "mocha";
import { mock, instance, when, verify } from "ts-mockito";

let server;
let routesMock;
let mailingSystemMock;

beforeEach(() => {

	routesMock = mock(Routes);
	mailingSystemMock = mock(MailingSystem);
	server = new Server(routesMock, mailingSystemMock);

	when(mailingSystemMock.startJobs()).thenReturn(null);
});

describe("Server class when it's created", () => {
  it("should not be null", () => {
    expect(server).to.not.equal("undefined");
  });
});


describe("Server class when start is called", () => {

  it("should start mailing jobs", () => {
  	server.startJobs();
  	console.log(mailingSystemMock);
  	verify(mailingSystemMock.startJobs()).called();
  })
})