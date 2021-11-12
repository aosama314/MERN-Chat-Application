require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", (error) => {
  console.log("Mongoose connection ERROR :" + error.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected.");
});

// Setup the models
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

const app = require("./app");

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000.");
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const jwt = require("jwt-then");

io.use(async (socket, next) => {
  console.log("From IO Use");
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);

    socket.userId = payload.id;
    next();
  } catch (error) {}
});

io.on("connection", (socket) => {
  console.log("Connected : " + socket.userId);
  // console.log(socket);

  socket.on("disconnect", () => {
    console.log("Disconnected : " + socket.userId);
    // console.log(socket);
  });
});
