const viewEngine = require("./config/viewEngine.js");
const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./route/web.js");
const connectDb = require("./config/connectDb.js");
var cors = require("cors");
require("dotenv").config();
const http = require("http");

let app = express();

app.use(cors());

const server = http.createServer(app);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDb();

let port = process.env.PORT || 8080;

// server.listen(port, () => {
//   console.log("SERVER RUNNING", process.env.PORT);
// });

app.listen(port, () => {
  console.log("SERVER RUNNING", process.env.PORT);
});
