import request from "supertest";
import app from "./index";

describe("Error Handling", () => {
  describe("HTTP Methods", () => {
    it("returns 404 for unsupported methods on /api/deck", async () => {
      await request(app).post("/api/deck").expect(404);

      await request(app).put("/api/deck").expect(404);

      await request(app).delete("/api/deck").expect(404);
    });

    it("returns 404 for unsupported methods on action endpoints", async () => {
      const endpoints = ["/api/shuffle", "/api/sort", "/api/reset"];

      for (const endpoint of endpoints) {
        await request(app).get(endpoint).expect(404);

        await request(app).put(endpoint).expect(404);

        await request(app).delete(endpoint).expect(404);
      }
    });
  });

  describe("Invalid Paths", () => {
    it("returns 404 for paths that do not exist", async () => {
      const invalidPaths = [
        "/api",
        "/api/",
        "/api/invalid",
        "/api/deck/invalid",
        "/api/shuffle/invalid",
        "/api/sort/invalid",
        "/api/reset/invalid",
        "/invalid",
        "/api/cards",
        "/api/shuffle-deck",
      ];

      for (const path of invalidPaths) {
        const response = await request(app).get(path).expect(404);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe("Endpoint not found");
      }
    });
  });

  describe("Malformed Requests", () => {
    it("handles requests with invalid JSON body", async () => {
      await request(app)
        .post("/api/shuffle")
        .send("invalid json")
        .set("Content-Type", "application/json")
        .expect(500);
    });

    it("handles requests with extremely large payloads", async () => {
      const largePayload = "x".repeat(1000000);

      await request(app)
        .post("/api/shuffle")
        .send({ data: largePayload })
        .expect(500);
    });
  });
});
