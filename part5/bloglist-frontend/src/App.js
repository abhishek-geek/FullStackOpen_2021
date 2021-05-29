import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Tooglable";
import blogService from "./services/blogs";
import loginServices from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});

  const blogFormRef = useRef();

  useEffect(async () => {
    const blogs = await blogService.getAll();
    blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
    console.log(blogs);
    setBlogs(blogs);
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    const userString = window.localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }
  }, []);

  // useEffect(async () => {
  //   const blogs = await blogService.getAll();
  //   blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
  //   console.log(blogs);
  //   setBlogs(blogs);
  // }, [blogs]);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser("");
    window.location.reload(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    try {
      console.log(41);
      const newUser = await loginServices.login({
        username,
        password,
      });
      setUser(newUser);
      setUsername("");
      setPassword("");
      console.log(newUser);
      window.localStorage.setItem("user", JSON.stringify(newUser));
      setMessage({ type: "info", body: `Welcome ${newUser.name}` });
      setTimeout(() => {
        setMessage({});
      }, 5000);
    } catch (exception) {
      setMessage({ type: "error", body: "Wrong credentials" });
      setTimeout(() => {
        console.error(message);
        setMessage({});
      }, 5000);
    }
  };
  console.log(user);
  const addBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    try {
      const bb = await blogService.create({ title, author, url }, user.token);
      if (bb.error) throw bb;
      // console.log("IMPORTANT", blog);
      // setBlogs(blogs.concat(blog));
      // console.log(blog);
      const blogs = await blogService.getAll();
      blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
      console.log(blogs);
      setBlogs(blogs);
      // window.location.reload();
      setMessage({
        type: "info",
        body: `a new blog ${title} by ${author} is added`,
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        body: err.message,
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          // setUsername={(e) => setUsername(e.target.value)}
          // setPassword={(e) => setPassword(e.target.value)}
        />
      ) : (
        <>
          {user.name} is loged in
          <button id="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} token={user} />
          </Togglable>
          {blogs.map((blog) => {
            return (
              <>
                <Blog key={blog.id} blog={blog} user={user} />
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default App;
