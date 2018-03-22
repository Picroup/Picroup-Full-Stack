export default `
  type Query { 
    login(userInput: UserInput!): User
  }
  
  type Mutation {
    register(userInput: UserInput!): User
  }
  
  input UserInput {
    username: String!
    password: String!
  }
  
  type User {
    _id: String!
    username: String!
  }
`;