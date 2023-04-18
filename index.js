const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const formidableMiddleware = require("express-formidable");
// const helmet = require("helmet");// helmet c'est à éviter
const morgan = require("morgan");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

//middleware
app.use(express.json());
// app.use(helmet());
app.use(morgan("common"));
// app.use(formidableMiddleware());

const cors = require("cors");
app.use(cors());

const userRoute = require("./routes/users");
app.use("/users", userRoute);

const postRoute = require("./routes/posts");
app.use("/posts", postRoute);

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

const conversationRoute = require("./routes/conversations");
app.use("/conversations", conversationRoute);

const messageRoute = require("./routes/messages");
app.use("/messages", messageRoute);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API de Social" });
});

// Pour démarrer le serveur :
app.listen(4000, () => {
  console.log("Server started");
});
