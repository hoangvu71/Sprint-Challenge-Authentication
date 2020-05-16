const supertest = require("supertest")
const server = require("../index")
const db = require("../database/dbConfig")

test("Log In", async () => {
    const user ={
        username: "Devin",
        password: "letsgo123"
    }
    const res = await supertest(server).post("/api/auth/login").send(user)
    expect(res.body.message).toBe("Successfully logged in!")
})