import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as expressValidator from "express-validator";
import Routes from "./routes";
import { inject } from "inversify";

export class Server {

  private app;
  private express;
  private router;
  private handlers;
  private routes;

  public constructor(
    @inject(Routes) routes:Routes
  ) {

    this.app = express();
    this.router = express.Router();
    this.routes = routes;
    // Define Handlers
    this.handlers = {};
  }

  private setViewEngine() {
    this.app.set("views", path.join(__dirname, "client"));
    this.app.set("view engine", "ejs");
    this.app.engine("html", require("ejs").renderFile);
  }

  // Body Parser Middleware
  private configureBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(cors());
    this.app.use(expressValidator());
  }

  private mountRoutes(): void {

    this.router.get("/", (req, res) => {
      res.render("index.html");
    });

    // Set Static Folder
    this.app.use(express.static(path.join(__dirname, "client")));

    // Set Base Route
    this.app.use("/api", this.router);

    // Middlware for Requests
    this.router.use(function (req, res, next) {
      // Logging can be done here
      next();
    });

    this.routes.setup(this.router, this.handlers);
  }

  public start(port) : void {

    this.setViewEngine();
    this.configureBodyParser();
    this.mountRoutes();

    this.app.listen(port, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log(`Server is listening on ${port}`);
      }
    });
  }

}

export default new Server(new Routes());
