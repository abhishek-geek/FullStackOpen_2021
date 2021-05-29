import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form className="blogForm" onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={url}
            name="Title"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-btn" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
