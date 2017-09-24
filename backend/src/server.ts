import { InversifyExpressServer } from 'inversify-express-utils';
import * as express from "express";
import * as morgan from 'morgan';
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import * as expressValidator from "express-validator";
import Routes from "./routes";
import { inject, Container } from "inversify";
import { MailingSystem } from "./models/system/mailing-system";

export class Server {

  private app;
  private server;
  private express;
  private router;
  private handlersContainer;
  private routes;
  private mailingSystem;
  private serviceBuilder;

  public constructor(
    @inject(Routes) routes:Routes,
    @inject(MailingSystem) mailingSystem:MailingSystem
  ) {

    this.app = express();
    this.router = express.Router();
    this.routes = routes;

    this.mailingSystem = mailingSystem;
  }

  private setViewEngine(server) {
    server.set("views", path.join(__dirname, "client"));
    server.set("view engine", "ejs");
    server.engine("html", require("ejs").renderFile);
  }

  // Body Parser Middleware
  private configureBodyParser(server) {
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(cors());
    server.use(helmet());
    server.use(expressValidator());
  }

  private mountRoutes(serverContainer): void {

    // Sets index view
    this.router.get("/", (req, res) => {
      res.render("index.html");
    });

    // Sets Static Folder
    this.app.use(express.static(path.join(__dirname, "client")));

    // Sets Base Route
    this.app.use("/api", this.router);

    // Configures Webservices
    this.routes.setup(serverContainer);
  }

  startJobs() {
    this.mailingSystem.startJobs();
  }

  private buildServer(container, server) {
    this.server = new InversifyExpressServer(container, null, null, this.app);

    this.server.setConfig((server) => {
      this.configureBodyParser(this.app);
    })
    return this.server.build();
  }

  public start(port) : void {

    let container = new Container();

    this.setViewEngine(this.app);
    this.startJobs();

    // Middleware for Requests
    container.bind<express.RequestHandler>("Morgan").toConstantValue(morgan("combined"));
    container.bind<express.RequestHandler>("CustomMiddleware").toConstantValue(function customMiddleware(req: any, res: any, next: any) {

      next();
    });
    this.mountRoutes(container);

    let app = this.buildServer(container, this.app);

    app.listen(port, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Server is listening on ${port}`);
      }
    });

  }

}

export default new Server(new Routes(), new MailingSystem());
