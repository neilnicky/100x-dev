import { describe, expect, it, vi } from "vitest";
import { app } from "../index";
import request from "supertest";

vi.mock("../db.ts", () => {
  return {
    prismaClient: {
      request: {
        create: vi.fn(),
        delete: vi.fn(),
      },
    },
  };
});


describe("Tests multiplication", () => {
  it("Should return 4 when 2 * 2", async () => {
    const res = await request(app).post("/multiply").send({
      a: 2,
      b: 2,
    });

    expect(res.body.answer).toBe(4);
    expect(res.statusCode).toBe(200);
  });

  it("Should return right value if one value is negative ", async () => {
    const res = await request(app).post("/multiply").send({
      a: -2,
      b: 500,
    });

    expect(res.body.answer).toBe(-1000);
    expect(res.statusCode).toBe(200);
  });

  it("Should fail when a number is too big", async () => {
    const res = await request(app).post("/multiply").send({
      a: 23,
      b: 500000000,
    });

    expect(res.body.message).toBe("Numbers must be less than 1,000,000");
    expect(res.statusCode).toBe(422);
  });
});
