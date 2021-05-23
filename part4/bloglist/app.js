const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const config = require("./utils/config");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./middleware/common");

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    // process.env.NODE_ENV === "test"
    //   ? logger.info("TestDB connected")
    //   :
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const errorHandler = (err, req, res, next) => {
  // logger.error("ERROR OCCURED", err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformated id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else {
    return res.status(400).json({ error: "Unidentified Error" });
  }
  next(err);
};
app.use(errorHandler);

module.exports = app;
