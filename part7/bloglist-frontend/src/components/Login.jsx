import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { setNotification } from "../reducers/notifReducer";
import { TextField, Button } from "@material-ui/core";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username,
        password,
      };
      console.log("new user", newUser);
      const name = await dispatch(login(newUser));
      dispatch(
        setNotification({ type: "info", body: `${name} Logged in` }, 10)
      );
      setUsername("");
      setPassword("");
      // window.location.assign("/");
    } catch (exception) {
      console.log(exception);
      dispatch(
        setNotification({ type: "error", body: "Wrong credentials" }, 10)
      );
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ marginLeft: "35%", marginTop: "2%" }}>
      <div>
        <TextField
          label="username"
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          label="password"
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant="contained" color="primary" id="login-btn" type="submit">
        login
      </Button>
    </form>
  );
};

Login.protoTypes = {
  username: PropTypes.string.isRequired,
};

export default Login;
