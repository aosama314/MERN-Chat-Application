const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup cors
const cors = require("cors");
app.use(cors());

// Setup the routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

// Setup ErrorHandlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
