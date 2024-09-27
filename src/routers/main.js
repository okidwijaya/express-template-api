const express = require("express");
const path = require("path");

const mainRouter = express.Router();

const welcomeRouter = require("../routers/welcome");
const unilandRouter = require("../routers/unilandRouters");
const templateUserRouter = require("../routers/templateUserRouters");
const templateProductRouter = require("../routers/templateProductRouters");

mainRouter.use(express.static(path.join(__dirname, 'public')));

mainRouter.use("/welcome", welcomeRouter);
mainRouter.use("/uniland", unilandRouter);
mainRouter.use("/user", templateUserRouter);
mainRouter.use("/products", templateProductRouter);

mainRouter.get("/", (request, response) => {
  response.redirect("welcome");
});

// mainRouter.get("/", (request, response) => {
//   response.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

module.exports = mainRouter;