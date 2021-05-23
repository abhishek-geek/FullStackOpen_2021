const blogsRouter = require("express").Router();
const Blog = require("../model/blog");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = { ...request.body };

  const user = request.user;

  if (!user || !user.id) {
    return response.status(401).json({ error: "login to post new blogs" });
  }

  const blog = new Blog({
    ...body,
    user: user.id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = {
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.status(200).json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  // const token = request.token;
  // const user = jwt.decode(token, process.env.SECRET);

  const user = request.user;

  if (!user || !user.id) {
    response.status(401).json({ error: "login to delete blogs" });
  }

  const blog = await Blog.findById(id);

  if (user.id.toString() === blog.user.toString()) {
    const result = await Blog.findByIdAndDelete(id);
    response.status(204).end();
  }

  response.status(401).json({ error: "Not Authorized to delete this blog" });
});

module.exports = blogsRouter;
