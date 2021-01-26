const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./keys');
const Users = require('./models/user');

const issueTokens = async ({ id }) => {
  const token = await jwt.sign({ id }, JWT_SECRET);
  return token;
};

const getAuthUser = async (req) => {
  const header = req.cookies.token;
  if (header) {
    const data = jwt.verify(header, JWT_SECRET);
    const authUser = await Users.findById(data.id);
    if (!authUser) throw new AuthenticationError('User Authentication failed');
    console.log(authUser);
    return authUser;
  }
  throw new AuthenticationError('User Authentication failed');
};

module.exports = { issueTokens, getAuthUser };
