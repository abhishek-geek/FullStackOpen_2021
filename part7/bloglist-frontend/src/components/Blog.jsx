import { TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const Blog = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const id = useParams().id;

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const blog = await blogs.find((blog) => blog.id === id);
    const comments = await blogService.getComments(id);
    console.log(blog);
    setBlog(blog);
    setComments(comments);
  }, [blogs, id]);

  const like = async () => {
    dispatch(likeBlog(blog));
  };

  const removeBlog = async () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`) &&
      dispatch(deleteBlog(blog));
    // window.location.reload(false);
  };

  const addComment = async () => {
    const newC = await blogService.newComment(id, comment);
    setComments(comments.concat(newC));
    setComment("");
  };

  if (!blog) {
    return <i>Loading...</i>;
  }

  return (
    <div style={{ marginLeft: "30%" }}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className="blogDetails">
        <Button href={blog.url}>Click here to read this blog</Button>
        <br />
        <div className="likes">Total Likes : {blog.likes} </div>

        <Button color="primary" className="like" onClick={like}>
          Like
        </Button>
        <br />
        <div>Added by : {blog.author}</div>
        {user && user.username === blog.user.username && (
          <Button coplor="secondary" className="remove" onClick={removeBlog}>
            remove
          </Button>
        )}
        <h3>Comments</h3>
        <TextField
          label="Add Comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button varient="contained" color="primary" onClick={addComment}>
          {" "}
          Add{" "}
        </Button>
        <ul>
          {comments.map((c) => (
            <li key={c.id}> {c.comment} </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
