const express = require("express");
const { PORT } = require("../src/config/serverConfig");
const bodyParser = require("body-parser");

const app = express();

const prepareAndStartServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on Port: ${PORT}`);
  });
};

prepareAndStartServer();
