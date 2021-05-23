const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

//adding user
const User = require("../model/user");
const newUser = {
  username: "root",
  name: "root",
  password: "root",
};

//login using root user

const login = async () => {
  const { body } = await api
    .post("/api/login")
    .send({ username: "root", password: "root" });
  const token = `Bearer ${body.token}`;
  return token;
};

//initializing the DB
const Blog = require("../model/blog");
const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await api.post("/api/users").send(newUser);

  const { body } = await api
    .post("/api/login")
    .send({ username: "root", password: "root" });

  const { id } = jwt.decode(body.token, process.env.SECRET);

  const blogObjects = initialBlogs.map((blog) => {
    blog.user = id;
    return new Blog(blog);
  });
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Blog API in OK conditions", () => {
  test("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("id is defined", async () => {
    const blogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(blogs.body[0].id).toBeDefined();
  });

  test("post is working", async () => {
    const token = await login();
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length + 1);

    const titles = response.body.map((blog) => blog.title);

    expect(titles).toContain("Canonical string reduction");
  });

  test("likes is set to 0 by default", async () => {
    const token = await login();
    const newBlog = {
      title: "Dummy",
      author: "Dummy Name",
      url: "http://www.example.com/",
    };
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token);
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toEqual(0);
  });

  test("title and url is required", async () => {
    const token = await login();
    const newBlog = {
      author: "Dummy Name Nimo",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token)
      .expect(400);
  });

  test("deleting a single blog is working", async () => {
    const token = await login();
    const response = await api.get("/api/blogs");
    const id = response.body[0].id;
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", token)
      .expect(204);
  });

  test("update a blog", async () => {
    const response = await api.get("/api/blogs");
    const oldBlog = response.body[0];
    const newBlog = {
      author: oldBlog.author,
      title: oldBlog.title,
      url: oldBlog.url,
      likes: 123,
    };
    const blog = await api
      .put(`/api/blogs/${oldBlog.id}`)
      .send(newBlog)
      .expect(200);
    expect(blog.body.likes).toEqual(123);
  });
});

describe("Blog API not allowing unauthorized acess", () => {
  test("Cannoy post without token", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("Cannot delete without token", async () => {
    const response = await api.get("/api/blogs");
    const id = response.body[0].id;
    await api.delete(`/api/blogs/${id}`).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
