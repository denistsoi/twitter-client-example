const request = require("supertest")
const assert = require("assert")
const app = require("../app")

describe("tweets", () => {
  it("should retrieve tweets", () => {
    return request(app)
      .post("/tweets", { json: true, body: { username: "denistsoi" } })
      .expect(200)
      .then(response => {
        const { error, tweets, length } = response.body;

        assert(length, 10)
        assert(tweets.length, 10)
      })
  })
})