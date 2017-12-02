import { Server } from "./../src/server";
import Routes from "./../src/routes";
import { MailingSystem } from "./../src/models/system/mailing-system";
import { expect } from "chai";
import "mocha";
import Logger from "./../src/logger/logger";
import { mock, instance, when, verify } from "ts-mockito";

let server;
let routesMock: Routes;
let mailingSystemMock: MailingSystem;

beforeEach(() => {
	Logger.createLogger();
	routesMock = mock(Routes);
	mailingSystemMock = mock(MailingSystem);
	server = new Server(routesMock, mailingSystemMock);

});

describe("Server class when it's created", () => {
  it("should not be null", () => {
    expect(server).to.not.equal("undefined");
  });
});


describe("Server class when start is called", () => {

  it("should start mailing jobs", () => {

		server.startJobs( () => {
			verify(mailingSystemMock.startJobs()).called();
		});

  });
})
