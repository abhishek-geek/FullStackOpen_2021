const jwt = require("jsonwebtoken");
const User = require("../model/user");

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

module.exports = { tokenExtractor, userExtractor };
