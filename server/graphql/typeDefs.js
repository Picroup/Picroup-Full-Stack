export default `
  type Query { 
    login(username: String!, password: String!): User
    user(userId: ID!): User
    rankedMedia(category: MediumCategory, rankBy: RankBy!, cursor: Float): CursorMedia!
    medium(mediumId: ID!): Medium
 }
  
  type Mutation {
    register(username: String!, password: String!): User!
    saveImageMedium(userId: ID!, minioId: ID!, width: Float!, aspectRatio: Float!, category: MediumCategory!): Medium!
    followUser(userId: ID!, toUserId: ID!): User!
    unfollowUser(userId: ID!, toUserId: ID!): User!
    saveComment(userId: ID!, mediumId: ID!, content: String!): Comment!
    starMedium(userId: ID!, mediumId: ID!): Medium!
  }
  
  type User {
    _id: ID!
    username: String!
    followingsCount: Int!
    followersCount: Int!
    followings(cursor: Float): CursorUsers!
    followers(cursor: Float): CursorUsers!
    media(cursor: Float): CursorMedia!
    interestedMedia(cursor: Float): CursorMedia!
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
    commentsCount: Int!
    comments(cursor: Float): CursorComments!
    stared(userId: ID!): Boolean!
  }
  
  type Comment {
    _id: ID!
    userId: ID!
    mediumId: ID!
    createdAt: Float!
    content: String!
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
  
  enum RankBy {
    today
    thisWeek
    thisMonth
  }
  
  type MediumDetail {
    width: Float
    aspectRatio: Float
  }
  
  type CursorMedia {
    cursor: Float
    items: [Medium]!
  }
  
  type CursorUsers {
    cursor: Float
    items: [User]!
  }
  
  type CursorComments {
    cursor: Float
    items: [Comment]!
  }
`;