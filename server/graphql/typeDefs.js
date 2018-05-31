export default `
  type Query { 
    login(username: String!, password: String!): User
    user(userId: ID!): User
    rankedMedia(rankBy: RankBy, cursor: Float): CursorMedia!
    medium(mediumId: ID!): Medium
    searchUser(username: String!): User
  }
  
  type Mutation {
    register(username: String!, password: String!): User!
    saveImageMedium(userId: ID!, minioId: ID!, width: Float!, aspectRatio: Float!): Medium!
    followUser(userId: ID!, toUserId: ID!): User!
    unfollowUser(userId: ID!, toUserId: ID!): User!
    saveComment(userId: ID!, mediumId: ID!, content: String!): Comment!
    starMedium(userId: ID!, mediumId: ID!): Medium!
    recommendMedium(mediumId: ID!, recommendMediumId: ID!): Int!
    
    deleteComment(commentId: String!): String!
  }
  
  type User {
    _id: ID!
    username: String!
    displayName: String!
    avatarId: String
    reputation: Int!
    followingsCount: Int!
    followersCount: Int!
    notificationsCount: Int!
    gainedReputation: Int!
    followings(cursor: Float): CursorUsers!
    followers(cursor: Float): CursorUsers!
    media(cursor: Float): CursorMedia!
    interestedMedia(cursor: Float): CursorMedia!
    staredMedia(cursor: Float): CursorMedia!
    notifications(cursor: Float): CursorNotofications!
    reputationLinks(cursor: Float): CursorReputationLinks!
    markNotificationsAsViewed: User!
    markReputationLinksAsViewed: User!
    followed(byUserId: ID!): Boolean
    
    setDisplayName(displayName: String!): User!
    setAvatarId(avatarId: String!): User!
    setPassword(password: String!, oldPassword: String!): User!
 }
  
  type Medium {
    _id: ID!
    userId: ID!
    createdAt: Float!
    endedAt: Float!
    kind: MediumKind!
    detail: MediumDetail
    minioId: ID!
    commentsCount: Int!
    comments(cursor: Float): CursorComments!
    stared(userId: ID!): Boolean!
    user: User!
    recommendedMedia(cursor: Float): CursorMedia!
  }
  
  type Comment {
    _id: ID!
    userId: ID!
    mediumId: ID!
    createdAt: Float!
    content: String!
    user: User!
  }
  
  type Notification {
    _id: ID!
    userId: ID!
    toUserId: ID!
    mediumId: ID
    content: String
    createdAt: Float!
    kind: NotificationKind!
    viewed: Boolean!
    user: User!
    medium: Medium
  }
  
  type ReputationLink {
    _id: ID!
    userId: ID!
    toUserId: ID!
    mediumId: ID
    createdAt: Float!
    value: Int!
    kind: ReputationKind!
    viewed: Boolean!
    user: User!
    medium: Medium
  }
  
  enum MediumKind {
    image
  }
  
  enum NotificationKind {
    commentMedium
    starMedium
    followUser
  }
  
  enum ReputationKind {
    saveMedium
    starMedium
    followUser
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
    items: [Medium!]!
  }
  
  type CursorUsers {
    cursor: Float
    items: [User!]!
  }
  
  type CursorComments {
    cursor: Float
    items: [Comment!]!
  }
  
  type CursorNotofications {
    cursor: Float
    items: [Notification!]!
  }
  
  type CursorReputationLinks {
    cursor: Float
    items: [ReputationLink!]!
  }
`;