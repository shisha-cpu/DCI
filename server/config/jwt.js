const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');

const generateToken = (userId, role) => {
  // if (!process.env.JWT_SECRET) {
  //   console.log(process.env.JWT_SECRET);
    
  //   throw new ErrorResponse('JWT secret is not configured', 500);
  // }

  return jwt.sign(
    { id: userId, role },
    'e3ff5f077839c1331b1d893a728246685cb7dba9e3a77bffe7d52eaccf660988',
    { expiresIn: '30d' }
  );
};

const verifyToken = (token) => {


  return jwt.verify(token, 'e3ff5f077839c1331b1d893a728246685cb7dba9e3a77bffe7d52eaccf660988');
};

module.exports = { generateToken, verifyToken };