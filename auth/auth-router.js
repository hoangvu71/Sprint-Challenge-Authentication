const router = require('express').Router();
const authModel = require("./auth-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.post('/register', async (req, res, next) => {
  // implement registration
  try {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  user.password = await bcrypt.hash(user.password, 14)

  const userExist = await authModel.findUser({username: req.body.username}).first()
  if (userExist) {
    return res.status(409).json({
      message: "Username taken."
    })
  }
  const addUser = await authModel.add(user)
  res.status(201).json(user)
  } catch(error) {
    next(error)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  try {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  if (!user.username || !user.password) {
    res.status(401).json({
      message: "Please enter both username and password"
    })
  }
  const userExist = await authModel.findUser({username: req.body.username}).first()
  if (!userExist) {
    return res.status(500).json({
      message: "Invalid credentials"
    })
  }
  const passwordValid = await bcrypt.compare(user.password, userExist.password)
  if (!passwordValid) {
    return res.status(500).json({
      message: "Invalid credentials"
    })
  }
  const tokenPayload = {
    userId: userExist.id,
  }

  res.cookie("token", jwt.sign(tokenPayload, "Super secret string"))

  res.status(200).json({
    message: "Successfully logged in!"
  })
} catch(error) {
  next(error)
}
});

module.exports = router;
