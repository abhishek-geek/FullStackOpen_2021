import React from "react";
import PropTypes from "prop-types";

const Login = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id="login-btn" type="submit">
      login
    </button>
  </form>
);

Login.protoTypes = {
  username: PropTypes.string.isRequired,
};
export default Login;
