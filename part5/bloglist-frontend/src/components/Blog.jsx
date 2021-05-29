import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog: b, user }) => {
  // const [user] = useState(u);
  const [blog, setBlog] = useState(b);
  const [btnLabel, setBtnLabel] = useState("View");
  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   // const userString = window.localStorage.getItem("user");
  //   // if (userString) {
  //   //   console.log(userString);
  //   //   const user = JSON.parse(userString);
  //   //   setUser(user);
  //   //   console.log(user);
  //   // } else {
  //   //   setUser(u);
  //   // }
  //   setUser(u);
  // }, []);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    const v = visible;
    setVisible(!v);
    if (!v) setBtnLabel("Hide");
    else setBtnLabel("View");
  };

  const like = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    setBlog(likedBlog);
    await blogService.like(likedBlog, user.token);
  };

  const removeBlog = async () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`) &&
      (await blogService.removeBlog(blog, user.token));
    window.location.reload(false);
  };

  return (
    <div style={blogStyle}>
      {console.log(blog)}
      {blog.title} {blog.author}
      <button className="show_hide" onClick={toggleVisibility}>
        {btnLabel}
      </button>
      <div style={{ display: visible ? "" : "none" }} className="blogDetails">
        <a href={blog.url}>Click to View Blog : {blog.url}</a>
        <br />
        <div className="likes">{blog.likes} </div>

        <button className="like" onClick={like}>
          Like
        </button>
        <br />
        {console.log(user)}
        {user && user.username === blog.user.username && (
          <button className="remove" onClick={removeBlog}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
