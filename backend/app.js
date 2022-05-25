const express = require("express");
//const res = require("express/lib/response");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(express.json({ strict: false }));
app.use(express.urlencoded());
app.use(cors());
// app.get("/", (req, res, next) => {
//   res.send("hello");
// });

routes(app);

module.exports = app;
