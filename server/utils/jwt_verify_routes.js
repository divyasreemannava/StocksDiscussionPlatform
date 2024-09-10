const jwt = require("jsonwebtoken")
const secret_key = process.env.secret_key

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      console.log(req.user)
      next();
    });
  };
  

  module.exports = authenticate