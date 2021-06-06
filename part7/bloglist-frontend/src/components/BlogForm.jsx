import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notifReducer";
import { addBlog } from "../reducers/blogReducer";
import { Button, TextField } from "@material-ui/core";

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = async (e) => {
    e.preventDefault();

    blogFormRef.current.toggleVisibility();
    try {
      console.log({ title, author, url });
      dispatch(addBlog({ title, author, url }));
      dispatch(
        setNotification(
          {
            type: "info",
            body: `a new blog ${title} by ${author} is added`,
          },
          10
        )
      );
    } catch (err) {
      console.error(err);
      dispatch(
        setNotification(
          {
            type: "error",
            body: err.message,
          },
          10
        )
      );
    }
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form className="blogForm" onSubmit={createBlog}>
        <div>
          <TextField
            label="title"
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            id="url"
            type="text"
            value={url}
            name="Title"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          id="create-btn"
          type="submit"
        >
          create
        </Button>
      </form>
    </>
  );
};

export default BlogForm;
