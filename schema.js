const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Gender { 
    male
    female
    other
  }

  type User {
    _id: String
    user_name: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: String
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    salary: Int!
  }

  input UserInput {
    user_name: String!
    email: String!
    password: String!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    salary: Int!
  }

  type Query {
    login(user_name: String!, password: String!): User
    get_employees: [Employee]  
    get_employee_by_id(_id: String!): Employee  
  }

  type Mutation {
    sign_up(user: UserInput!): User
    add_employee(employee: EmployeeInput!): Employee
    update_employee(_id: String!, employee: EmployeeInput!): Employee
    delete_employee(_id: String!): Boolean
  }
`;

module.exports = { typeDefs };

