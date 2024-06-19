const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/User");

const api = supertest(app);

describe("User administration", () => {
  const testUser = {
    username: "testusername",
    name: "testname",
    password: "testpassword",
  };

  beforeEach(async () => {
    await api.post("/api/test/reset");
    await api.post("/api/users/register").send(testUser).expect(201);
  });

  test("User registration with existing username fails", async () => {
    const secondUser = await api
      .post("/api/users/register")
      .send(testUser)
      .expect(400);

    assert.strictEqual(secondUser.status, 400);
  });

  test("User registration with valid credentials succeeds", async () => {
    const allUsers = await api.get("/api/users/all").expect(200);

    assert.strictEqual(allUsers.body.length, 1);
  });

  test("User login with invalid credentials fails", async () => {
    const invalidLogin = await api
      .post("/api/users/login")
      .send({ username: "wrongusername", password: "wrongpassword" })
      .expect(400);

    assert.strictEqual(invalidLogin.status, 400);
  });

  test("User login with valid credentials pass and contains the jwt token", async () => {
    const validLogin = await api
      .post("/api/users/login")
      .send({ username: "testusername", password: "testpassword" })
      .expect(200);

    assert.strictEqual(validLogin.status, 200);
    assert.ok(validLogin.body.token);
  });

  after(() => {
    mongoose.connection.close();
  });
});
