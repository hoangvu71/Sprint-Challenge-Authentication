const supertest = require("supertest")

const server = require("../index")

test("GET /", async () => {
    const endpoint = "/"
    const status = 200

    const res = await supertest(server).get(endpoint)

    expect(res.body.message).toBe("Welcome!")
})