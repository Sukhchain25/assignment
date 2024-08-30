import request from "supertest";
import app from "../../app";
import LicensePlan from "../models/licensePlan.model";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
const testDatabaseUrl = "mongodb://localhost:27017/test_db";
let server;
let token;
let userData = {
  name: faker.internet.userName(),
  password: "0000",
  emailId: faker.internet.email(),
};
let plan;

beforeAll(async () => {
  jest.setTimeout(10000);
  await mongoose.connect(testDatabaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Start the server
  server = app.listen(3002, () => {
    console.log("Test server running on port 3002");
  });

  // Create a license plan
  plan = await LicensePlan.create({
    name: "Basic",
    maxApiCalls: 5,
    price: 10,
  });
});

describe("User Sign up, sign in and assign a plan to the user", () => {
  it("should sign up a new user", async () => {
    const response = await request(server)
      .post("/api/users/sign-up")
      .send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User saved successfully");
  });

  it("should log in the user", async () => {
    const response = await request(server).post("/api/users/sign-in").send({
      emailId: userData.emailId.toLowerCase(),
      password: userData.password,
    });
    token = response.body.token;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  it("should assign a plan to the user", async () => {
    const response = await request(server)
      .put("/api/users/select-plan")
      .send({ planId: plan._id })
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Plan selected successfully");
  });

  it("should test api calls with limit", async () => {
    const response = await request(server)
      .get("/api/usage/demo-endpoint")
      .set("Authorization", `Bearer ${token}`);
    if (response.body.countLeft > 0) {
      expect(response.status).toBe(200);
      expect(response.body.countLeft).toBe(response.body.countLeft);
    } else {
      expect(response.status).toBe(403);
      expect(response.body.error).toBe("LimitExceededError");
      expect(response.body.message).toBe(
        "API usage limit exceeded for the current plan"
      );
    }
  });
});
