const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

app.use(cookieParser());
app.use(express.json());

const url = require("./env.js").url;
const PORT = process.env.PORT || 8000;

const userRouter = require("./routes/UserRouter.js");
app.use("/api/user", userRouter);

const thoughtsRouter = require("./routes/ThoughtsRouter.js");
app.use("/api/thoughts", thoughtsRouter);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected, connected"))
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => console.log(`Server on at ${PORT}`));
