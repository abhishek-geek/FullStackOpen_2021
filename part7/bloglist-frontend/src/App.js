import { Container } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Blog from "./components/Blog";

import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import Togglable from "./components/Tooglable";
import Users from "./components/Users";
import UsersBlogs from "./components/UsersBlogs";

import { initBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { setUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("loged in user ", user);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setUsers());
      await dispatch(initBlogs());
      const userString = await window.localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        await dispatch(setUser(user));
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (!user) {
    <Redirect to="/login" />;
  }

  return (
    <Container>
      <div>
        <NavBar />
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>

          <Route path="/login">
            {user && <Redirect to="/" />}
            <Login />
          </Route>

          <Route path="/users/:id">
            <UsersBlogs />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/">
            <h2>blogs</h2>

            <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
              <BlogForm blogFormRef={blogFormRef} />
            </Togglable>

            <Blogs />

            {!user && <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Container>
  );
};

export default App;
