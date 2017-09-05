import * as express from 'express';
import * as path from 'path';

export class Server {

  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();

    // View Engine
    this.express.set("views", path.join(__dirname, "client"));
    this.express.set("view engine", "ejs");
    this.express.engine("html", require("ejs").renderFile);

    // Set Static Folder
    this.express.use(express.static(path.join(__dirname, "client")));
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.render("index.html");
    });

    this.express.use("/", router);

  }



}

export default new Server().express;
