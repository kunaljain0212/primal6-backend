const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    phone: String!
  }
  type Query {
    users: [User]
    profile: User
    login(email: String!, password: String!): Auth!
  }
  type Auth {
    user: User
  }
  type Mutation {
    Register(email: String!, password: String!, name: String!, phone: String): Auth
  }
`;
