const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  author: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  clubs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Club'
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ],
});

const Book = model('Book', bookSchema);

module.exports = Book;
