const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    age: Int
    isActive: Boolean
    createdAt: String
  }

  type AuthPayload {
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  type UserResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type UsersResponse {
    success: Boolean!
    count: Int!
    users: [User]
  }

  # ── Queries ──
  type Query {
    # Public
    login(email: String!, password: String!): AuthPayload!

    # Protected
    me: User
    getUser(id: ID!): UserResponse!

    # Admin only
    getAllUsers: UsersResponse!
  }

  # ── Mutations ──
  type Mutation {
    signup(name: String!, email: String!, password: String!, age: Int): AuthPayload!
    updateUser(id: ID!, name: String, email: String, age: Int): UserResponse!
    deleteUser(id: ID!): UserResponse!
  }
`;

module.exports = typeDefs;
