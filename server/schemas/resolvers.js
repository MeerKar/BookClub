const { User, Book, Club, Review, Rating } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { Types } = require("mongoose");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("books").populate("clubs");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("books").populate("clubs");
    },
    books: async () => {
      return Book.find()
        .populate("users")
        .populate("ratings")
        .populate("reviews");
    },
    book: async (parent, { bookId }) => {
      console.log("getting book", bookId);
      return Book.findOne({ _id: bookId })
        .populate("users")
        .populate("ratings")
        .populate("reviews");
    },
    bookByTitle: async (parent, { title }) => {
      return Book.findOne({ title })
        .populate("users")
        .populate("ratings")
        .populate("reviews");
    },
    clubs: async () => {
      return Club.find().populate("books").populate("users");
    },
    club: async (parent, { clubId }) => {
      return Club.findOne({ _id: clubId }).populate("books").populate("users");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("books")
          .populate("clubs");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    reviews: async () => {
      return Review.find().populate();
    },
    review: async (parent, { id }) => {
      return Review.findOne({ _id: id }).populate();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addBook: async (parent, { title, author, image, description }) => {
      const book = await Book.create({ title, author, image, description });
      return book;
    },
    addReview: async (parent, { bookId, reviewText, userId }, context) => {
      if (!bookId || !reviewText || !userId) {
        throw new Error("All fields are required");
      }

      const review = await Review.create({ bookId, reviewText, userId });
      return review;
    },
    addClub: async (parent, { name }) => {
      const club = await Club.create({ name });
      return club;
    },
    addBookToClub: async (parent, { clubId, bookId }, context) => {
      await Club.findOneAndUpdate(
        { _id: clubId },
        { $addToSet: { books: bookId } }
      );
      return Club.findOne({ _id: clubId }).populate("books").populate("users");
    },
    addUserToClub: async (parent, { clubId, userId }, context) => {
      if (context.user) {
        await Club.findOneAndUpdate(
          { _id: clubId },
          { $addToSet: { users: userId } }
        );
        return Club.findOne({ _id: clubId })
          .populate("books")
          .populate("users");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addRating: async (parent, { value, userId, bookId }) => {
      const rating = await Rating.create({ value, userId, bookId });
      return rating;
    },
    removeBook: async (parent, { bookId }) => {
      const book = await Book.findOneAndDelete({ _id: bookId });
      return book;
    },
    removeReview: async (parent, { bookId, reviewId }) => {
      const book = await Book.findOneAndUpdate(
        { _id: bookId },
        {
          $pull: {
            reviews: {
              _id: reviewId,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate("reviews");
      return book;
    },
    removeRating: async (parent, { ratingId }) => {
      const rating = await Rating.findOneAndDelete({ _id: ratingId });
      return rating;
    },
    addToBookshelf: async (parent, { bookId, userId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { books: bookId } },
        { new: true }
      ).populate("books");
      return updatedUser;
    },
  },
};

module.exports = resolvers;
