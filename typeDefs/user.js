const { gql } = require('apollo-server-express');

module.exports = gql`
  type Rocket {
    rocket_id: String
    rocket_name: String
    rocket_type: String
  }
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
    token: String!
  }
  type Mutation {
    Register(email: String!, password: String!, name: String!, phone: String): Auth
  }
`;
