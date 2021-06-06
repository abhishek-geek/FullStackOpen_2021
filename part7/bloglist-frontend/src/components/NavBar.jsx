import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    dispatch(logout());
    // window.location.reload(false);
    window.location.assign("/login");
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Blog
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          {user ? (
            <Button style={{ marginLeft: 0 }}>
              <em>{user.name} is loged in</em>
              <Button color="secondary" id="logout-btn" onClick={handleLogout}>
                Logout
              </Button>
            </Button>
          ) : (
            <IconButton edge="end" color="primary" component={Link} to="/login">
              Login
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
