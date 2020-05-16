const db = require("../database/dbConfig")
module.exports = {
    add,
    findUser
}

function add(user) {
    return db("users").insert(user)
}

function findUser(username) {
    return db("users").where(username)
}