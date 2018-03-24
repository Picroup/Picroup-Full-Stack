export default `
  type Query { 
    login(username: String!, password: String!): User!
  }
  
  type Mutation {
    register(username: String!, password: String!): User!
    saveImageMedium(userId: ID!, minioId: ID!, width: Float!, aspectRatio: Float!): Medium!
  }
  
  type User {
    _id: ID!
    username: String!
  }
  
  type Medium {
    _id: ID!
    userId: ID!
    createdAt: Float!
    endedAt: Float!
    kind: MediumKind!
    detail: MediumDetail
    minioId: ID!
  }
  
  enum MediumKind {
    image
  }
  
  type MediumDetail {
    width: Float
    aspectRatio: Float
  }
  
`;