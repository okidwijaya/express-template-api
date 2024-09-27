const express = require('express');
const path = require("path");

const welcomeController = require('../controllers/welcome');

const welcomeRouter = express.Router();

// welcomeRouter.get('/', welcomeController.greeting);

welcomeRouter.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, '/../../public', 'index.html'));
});

module.exports = welcomeRouter;