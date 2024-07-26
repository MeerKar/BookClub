const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    books: [Book]
    clubs: [Club]
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    image: String
    description: String
    review: String
    createdAt: String
    users: [User]
    ratings: [Rating]
    reviews: [Review]
  }

  type Review {
    id: ID
    reviewText: String
    userId: String!
    createdAt: String
    bookId: ID!
  }

  type Club {
    _id: ID
    name: String
    image: String
    books: [Book]
    users: [User]
  }

  type Rating {
    _id: ID
    value: Int
    userId: ID!
    bookId: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    books: [Book]
    book(bookId: ID!): Book
    bookByTitle(title: String!): Book
    clubs: [Club]
    club(clubId: ID!): Club
    me: User
    reviews: [Review]
    review(reviewId: ID!): Review
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(title: String!, author: String!, image: String, description: String): Book
    addReview(bookId: ID!, reviewText: String!, userId: ID!): Review
    addClub(name: String!): Club
    addBookToClub(clubId: ID!, bookId: ID!): Club
    addUserToClub(clubId: ID!, userId: ID!): Club
    addRating(value: Int!, userId: ID!, bookId: ID!): Rating
    removeBook(bookId: ID!): Book
    removeReview(bookId: ID!, reviewId: ID!): Book
    removeRating(ratingId: ID!): Rating
    addToBookshelf(bookId: ID!, userId: ID!): User
  }
`;

module.exports = typeDefs;
