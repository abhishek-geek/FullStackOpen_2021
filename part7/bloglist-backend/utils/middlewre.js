const jwt = require("jsonwebtoken");
const User = require("../model/user");
const morgan = require("morgan");

morgan.token("body", (req, res) => JSON.stringify(req.body));
const logger = morgan(function (tokens, req, res) {
  //   console.log(tokens.req("body"));
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens["body"](req, res),
  ].join(" ");
});

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    request.token = token;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (token) {
    const { id } = jwt.decode(token, process.env.SECRET);
    const user = await User.findById(id);
    request.user = user;
  }

  next();
};

module.exports = { logger, tokenExtractor, userExtractor };
