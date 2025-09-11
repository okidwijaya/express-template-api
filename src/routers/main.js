const express = require("express");
const path = require("path");

const mainRouter = express.Router();

const welcomeRouter = require("../routers/welcome");
const templateUserRouter = require("../routers/templateUserRouters");
const templateProductRouter = require("../routers/templateProductRouters");
const templateCollectionRouter = require("../routers/templateCollectionRouter");
const templateCartRouter = require("../routers/templateCartRouters");
const templateTransactionRouter = require("../routers/templateTransactionRouters");
const templateBlogRouter = require("../routers/templateBlogRouters");

mainRouter.use(express.static(path.join(__dirname, 'public')));

mainRouter.use("/welcome", welcomeRouter);
mainRouter.use("/user", templateUserRouter);
mainRouter.use("/products", templateProductRouter);
mainRouter.use("/collections", templateCollectionRouter);
mainRouter.use("/cart", templateCartRouter);
mainRouter.use("/transaction", templateTransactionRouter);
mainRouter.use("/blog", templateBlogRouter)

mainRouter.get("/", (request, response) => {
  response.redirect("/api/v1/welcome");
});

// mainRouter.get("/", (request, response) => {
//   response.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

module.exports = mainRouter;