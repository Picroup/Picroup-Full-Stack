export default `
  type Query { 
    login(username: String!, password: String!): User
    user(userId: ID!): User
    rankedMedia(rankBy: RankBy, cursor: Float): CursorMedia!
    hotMedia: CursorMedia!
    hotMediaByTag(tag: String): CursorMedia!
    medium(mediumId: ID!): Medium
    searchUser(username: String!): User
  }
  
  type Mutation {
    getVerifyCode(phoneNumber: String!): String!
    register(username: String!, password: String!, phoneNumber: String!, code: Float!): User!
    
    saveImageMedium(userId: ID!, minioId: ID!, width: Float!, aspectRatio: Float!, tags: [String!]): Medium!
    saveComment(userId: ID!, mediumId: ID!, content: String!): Comment!
    saveUserFeedback(userId: ID!, toUserId: ID!, content: String!): Feedback!
    saveMediumFeedback(userId: ID!, mediumId: ID!, content: String!): Feedback!
    saveCommentFeedback(userId: ID!, commentId: ID!, content: String!): Feedback!
    saveAppFeedback(userId: ID!, content: String!): Feedback!

    followUser(userId: ID!, toUserId: ID!): User!
    unfollowUser(userId: ID!, toUserId: ID!): User!
    starMedium(userId: ID!, mediumId: ID!): Medium!
    recommendMedium(mediumId: ID!, recommendMediumId: ID!): Int!
    
    deleteMedium(mediumId: ID!): ID!
    deleteComment(commentId: ID!): ID!
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
    tags: [String!]
    kind: MediumKind!
    detail: MediumDetail
    minioId: ID!
    commentsCount: Int!
    comments(cursor: Float): CursorComments!
    stared(userId: ID!): Boolean!
    user: User!
    recommendedMedia(cursor: Float): CursorMedia!
    
    addTag(tag: String!, byUserId: ID!): Medium!
    removeTag(tag: String!, byUserId: ID!): Medium!
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
  
  type Feedback {
    _id: ID!
    userId: ID!
    toUserId: ID
    mediumId: ID
    commentId: ID
    createdAt: Float!
    kind: FeedbackKind!
    content: String!
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
  
  enum FeedbackKind {
    user
    medium
    comment
    app
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