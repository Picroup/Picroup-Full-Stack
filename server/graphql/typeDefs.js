export default `
  type Query { 
    login(username: String!, password: String!): User!
    rankedMedia(category: MediumCategory, rankBy: RankBy!, cursor: Float): CursorMedia!
  }
  
  type Mutation {
    register(username: String!, password: String!): User!
    saveImageMedium(userId: ID!, minioId: ID!, width: Float!, aspectRatio: Float!, category: MediumCategory!): Medium!
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
    category: MediumCategory!
    kind: MediumKind!
    detail: MediumDetail
    minioId: ID!
  }
  
  enum MediumCategory {
    popular
    laughing
    beauty
    handsom
    animal
    photography
    design
  }
  
  enum MediumKind {
    image
  }
  
  type MediumDetail {
    width: Float
    aspectRatio: Float
  }
  
  enum RankBy {
    today
    thisWeek
    thisMonth
  }
  
  type CursorMedia {
    cursor: Float!
    media: [Medium]!
    remain: Int!
  }
`;