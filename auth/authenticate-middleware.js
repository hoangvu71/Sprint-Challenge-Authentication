/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")

function restrict() {
  
  return async (req, res, next) => {
    const authError = {
    errorMessage: "Invalid credentials. Please enter again."
  }
      try {
       let token = req.headers.cookie
        token = token.replace("token=", "")
       if (!token) {
         return res.status(401).json(authError)
       }
       jwt.verify(token, "Super secret string", (err, decodedPayload) => {
         if (err) {
           return res.status(401).json(authError)
         }
         req.token = decodedPayload
         next()
       })
        
      } catch(error) {
        next(error)
      }
  }
}

module.exports = restrict