const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('../models/user');
const { issueTokens, getAuthUser } = require('../auth');

module.exports = {
  Query: {
    users: async () => {
      const users = await Users.find();
      return users;
    },
    login: async (_, { email, password }, { res }) => {
      const user = await Users.findOne({ email: email });
      if (!user) throw new Error('Invalid Credentials!');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid Credentials');
      const token = await issueTokens(user);
      res.cookie('token', token, { httpOnly: true });
      return { user };
    },
    profile: async (_, args, { req }) => {
      const authUser = await getAuthUser(req);
      if (!authUser) throw new Error('User not authenticated');
      return authUser;
    },
  },
  Mutation: {
    Register: async (_, { id, email, name, password, phone }, { res }) => {
      const savedperson = await Users.findOne({ email: email });
      if (savedperson) throw new Error('Email Already Exists!');
      const hashedpass = await bcrypt.hash(password, 12);
      const user = new Users({
        id,
        email,
        name,
        password: hashedpass,
        phone,
      });
      await user.save();
      const token = await issueTokens(user);
      res.cookie('token', token, { httpOnly: true });
      return { user };
    },
  },
};
