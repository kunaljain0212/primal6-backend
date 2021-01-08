const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./keys');
const Users = require('./models/user');

const issueTokens = async ({ id }) => {
  const token = await jwt.sign({ id }, JWT_SECRET);
  return token;
};

const getAuthUser = async (context, requiresAuth = false) => {
  const header = context.headers.authorization;
  if (header) {
    const token = jwt.verify(header, JWT_SECRET);
    const authUser = await Users.findById(token.id);
    if (!authUser) throw new AuthenticationError('User Authentication failed');
    if (requiresAuth) return authUser;
    return null;
  }
  throw new AuthenticationError('User Authentication failed');
};

module.exports = { issueTokens, getAuthUser };
