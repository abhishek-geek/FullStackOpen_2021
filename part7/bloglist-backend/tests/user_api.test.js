const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

//initializing the DB
const User = require("../model/user");
const initialUsers = [
  {
    username: "root",
    name: "Root",
    password: "root",
  },
  {
    username: "user",
    name: "User",
    password: "user",
  },
];
beforeEach(async () => {
  await User.deleteMany({});
  //   const userObjects = initialUsers.map((user) => new User(user));
  //   const promiseArray = userObjects.map((user) => user.save());
  const promiseArray = initialUsers.map((user) =>
    api.post("/api/users").send(user)
  );
  await Promise.all(promiseArray);
});

describe("Validating Users", () => {
  test("do not allow username of length less than 3", async () => {
    const testUser = {
      username: "a",
      name: "Name",
      password: "123",
    };
    const res = await api.post("/api/users").send(testUser).expect(400);
    expect(res.body.error).toBeDefined();
  });

  test("username must be unique", async () => {
    const testUser = {
      username: "root",
      name: "Name",
      password: "123",
    };
    const res = await api.post("/api/users").send(testUser).expect(400);
    expect(res.body.error).toBeDefined();
  });

  test("do not allow password of length less than 3", async () => {
    const testUser = {
      username: "abc",
      name: "Name",
      password: "1",
    };
    const res = await api.post("/api/users").send(testUser).expect(400);
    expect(res.body.error).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
